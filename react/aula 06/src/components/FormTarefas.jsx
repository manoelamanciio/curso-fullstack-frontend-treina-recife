import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormTarefas.css";
import axios from "axios";

function FormTarefas() {
    const [titulo, setTitulo] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [idUsuario, setIdUsuario] = useState(""); // Ajustado para ID do usuário (responsável)
    const [descricao, setDescricao] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [statusTarefa, setStatusTarefa] = useState("");
    const [idProjeto, setIdProjeto] = useState(""); // Ajustado para ID numérico do projeto
    const [definirLembrete, setDefinirLembrete] = useState(false);

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
    };

    const salvar = (e) => {
        e.preventDefault();

        const tarefas = {
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            dataCriacao: dataCriacao || null,
            dataConclusao: dataConclusao || null,
            prioridade: prioridade || null,
            statusTarefa: statusTarefa || null,
            idProjeto: idProjeto ? Number(idProjeto) : null,
            idUsuario: idUsuario ? Number(idUsuario) : null
        };

        axios.post("/tarefas", tarefas)
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
                <h1 className="titulo-tarefa" >Adicionar Nova Tarefa</h1>

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
                        <Button variant="success" className="btn-lista-tarefas" href="#lista">
                            <i className="bi bi-list-check" ></i> Lista de Tarefas
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
                                ID do Responsável (Usuário): <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="idUsuario"
                                value={idUsuario}
                                onChange={(e) => setIdUsuario(e.target.value)}
                                placeholder="Digite o ID do usuário"
                                required
                            />
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
                            <Form.Control
                                type="number"
                                id="idProjeto"
                                value={idProjeto}
                                onChange={(e) => setIdProjeto(e.target.value)}
                                placeholder="Digite o ID do projeto"
                                required
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-4" >
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
        </div>
    );
}

export default FormTarefas;