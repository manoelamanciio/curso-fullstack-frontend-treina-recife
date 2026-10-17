import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormTarefas.css";
import api from "../Api";
import ListaDeTarefas from "./ListaDeTarefas";
import CampoBusca from "./CampoBusca";

// Aceita array simples ou página do Spring ({ content: [...] })
function extrairLista(data) {
    return Array.isArray(data) ? data : data?.content ?? [];
}

function ordenarPorNome(lista) {
    return [...lista].sort((a, b) => (a.nome ?? "").localeCompare(b.nome ?? ""));
}

function FormTarefas() {
    // controla o modal da lista de tarefas
    const [mostrarLista, setMostrarLista] = useState(false);

    // opções dos selects (vêm da API)
    const [usuarios, setUsuarios] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [carregandoOpcoes, setCarregandoOpcoes] = useState(true);

    const [titulo, setTitulo] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [idUsuario, setIdUsuario] = useState(""); // ID do usuário (responsável)
    const [descricao, setDescricao] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [statusTarefa, setStatusTarefa] = useState("");
    const [idProjeto, setIdProjeto] = useState(""); // ID do projeto
    const [definirLembrete, setDefinirLembrete] = useState(false);

    // Muda a cada limpeza do formulário para esvaziar os campos de busca
    const [resetKey, setResetKey] = useState(0);

    // Carrega usuários e projetos para preencher os selects
    useEffect(() => {
        Promise.all([api.get("/usuarios"), api.get("/projetos")])
            .then(([resUsuarios, resProjetos]) => {
                setUsuarios(ordenarPorNome(extrairLista(resUsuarios.data)));
                setProjetos(ordenarPorNome(extrairLista(resProjetos.data)));
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar usuários e projetos.");
            })
            .finally(() => setCarregandoOpcoes(false));
    }, []);

    const abrirLista = () => setMostrarLista(true);
    const fecharLista = () => setMostrarLista(false);

    const limparCampos = () => {
        setTitulo("");
        setPrioridade("");
        setIdUsuario("");
        setDescricao("");
        setDataCriacao("");
        setDataConclusao("");
        setStatusTarefa("");
        setIdProjeto("");
        setDefinirLembrete(false);
        setResetKey((k) => k + 1);
    };

    // REGRA: o usuário só pode ter tarefa se for responsável por pelo menos um projeto
    const usuarioTemProjeto = (id) =>
        projetos.some((p) => {
            const idResponsavel = p.idResponsavel ?? p.responsavel?.id ?? p.responsavelId;
            return Number(idResponsavel) === Number(id);
        });

    const salvar = (e) => {
        e.preventDefault();

        if (!usuarioTemProjeto(idUsuario)) {
            alert(
                "Este usuário não possui nenhum projeto cadastrado.\nCadastre um projeto para ele antes de criar tarefas."
            );
            return;
        }

        const tarefas = {
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            dataCriacao: dataCriacao || null,
            dataConclusao: dataConclusao || null,
            prioridade: prioridade || null,
            statusTarefa: statusTarefa || null,
            idProjeto: idProjeto ? Number(idProjeto) : null,
            idUsuario: idUsuario ? Number(idUsuario) : null,
        };

        api
            .post("/tarefas", tarefas)
            .then((response) => {
                console.log(response.data);
                alert("Sua tarefa foi salva com sucesso!");
                limparCampos();
            })
            .catch((error) => {
                console.error("Erro completo:", error);
                if (error.response && error.response.data) {
                    console.log("Detalhes do erro:", error.response.data);
                    alert("Erro ao salvar: " + JSON.stringify(error.response.data));
                } else {
                    alert("Erro ao salvar tarefa. Verifique os dados.");
                }
            });
    };

    const cancelar = () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja cancelar? \n Os dados que não foram salvos serão perdidos."
        );
        if (confirmar) {
            limparCampos();
        }
    };

    return (
        <div className="fundo-azul-pagina">
            <div className="container-tarefa">
                <h1 className="titulo-tarefa">Adicionar Nova Tarefa</h1>

                <Form className="form-tarefa" onSubmit={salvar}>
                    <div className="topo-form-tarefa">
                        <Form.Group className="campo-tarefa mb-3 flex-grow-1">
                            <Form.Label className="text-start d-block">
                                Título:<span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Digite o título da tarefa"
                                required
                            />
                        </Form.Group>

                        {/* type="button" evita que dispare o submit do formulário */}
                        <Button
                            type="button"
                            variant="success"
                            className="btn-lista-tarefas"
                            onClick={abrirLista}
                        >
                            <i className="bi bi-list-check"></i> Lista de Tarefas
                        </Button>
                    </div>

                    <div className="alinhar-campos-tarefa">
                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Prioridade: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="prioridade"
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="BAIXA">Baixa</option>
                                <option value="MEDIA">Média</option>
                                <option value="ALTA">Alta</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Responsável: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <CampoBusca
                                key={`usuario-${resetKey}`}
                                id="idUsuario"
                                opcoes={usuarios}
                                valorId={idUsuario}
                                onSelecionar={setIdUsuario}
                                placeholder="Digite o nome do responsável"
                                required
                            />
                            {!carregandoOpcoes && usuarios.length === 0 && (
                                <Form.Text className="text-danger d-block text-start">
                                    Nenhum usuário cadastrado.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </div>

                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label className="text-start d-block">Descrição:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descreva a tarefa"
                        />
                    </Form.Group>

                    <div className="alinhar-campos-tarefa">
                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Data de criação: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataCriacao"
                                value={dataCriacao}
                                onChange={(e) => setDataCriacao(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Data de conclusão: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataConclusao"
                                value={dataConclusao}
                                min={dataCriacao || undefined}
                                onChange={(e) => setDataConclusao(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="alinhar-campos-tarefa">
                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Status: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="statusTarefa"
                                value={statusTarefa}
                                onChange={(e) => setStatusTarefa(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_ANDAMENTO">Em andamento</option>
                                <option value="CONCLUIDA">Concluída</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Projeto: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <CampoBusca
                                key={`projeto-${resetKey}`}
                                id="idProjeto"
                                opcoes={projetos}
                                valorId={idProjeto}
                                onSelecionar={setIdProjeto}
                                placeholder="Digite o nome do projeto"
                                required
                            />
                            {!carregandoOpcoes && projetos.length === 0 && (
                                <Form.Text className="text-danger d-block text-start">
                                    Nenhum projeto cadastrado.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-4">
                        <Form.Check
                            className="text-start d-block"
                            type="checkbox"
                            id="definirLembrete"
                            label="Definir Lembrete"
                            checked={definirLembrete}
                            onChange={(e) => setDefinirLembrete(e.target.checked)}
                        />
                    </Form.Group>

                    <div className="botoes-tarefa">
                        <Button variant="success" type="submit" className="w-100 mb-2">
                            Salvar
                        </Button>

                        <Button
                            variant="outline-danger"
                            type="button"
                            className="w-100"
                            onClick={cancelar}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </div>

            {/* MODAL: lista de tarefas com os campos de pesquisa */}
            <ListaDeTarefas show={mostrarLista} onHide={fecharLista} />
        </div>
    );
}

export default FormTarefas;