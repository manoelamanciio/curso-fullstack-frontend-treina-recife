import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormProjeto.css";
import api from "../Api";
import ListaDeProjetos from "./ListaDeProjetos";
import CampoBusca from "./CampoBusca";

// Aceita array simples ou página do Spring ({ content: [...] })
function extrairLista(data) {
    return Array.isArray(data) ? data : data?.content ?? [];
}

function FormProjeto() {
    // controla o modal da lista de projetos
    const [mostrarLista, setMostrarLista] = useState(false);

    // opções do select de responsável (vêm da API)
    const [usuarios, setUsuarios] = useState([]);
    const [carregandoUsuarios, setCarregandoUsuarios] = useState(true);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [status, setStatus] = useState("");
    const [idResponsavel, setIdResponsavel] = useState("");

    // Muda a cada limpeza do formulário para esvaziar o campo de busca
    const [resetKey, setResetKey] = useState(0);

    // Carrega os usuários para preencher o select de responsável
    useEffect(() => {
        api
            .get("/usuarios")
            .then((response) => {
                const lista = extrairLista(response.data);
                setUsuarios(
                    [...lista].sort((a, b) => (a.nome ?? "").localeCompare(b.nome ?? ""))
                );
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar os usuários.");
            })
            .finally(() => setCarregandoUsuarios(false));
    }, []);

    const abrirLista = () => setMostrarLista(true);
    const fecharLista = () => setMostrarLista(false);

    const limparCampos = () => {
        setNome("");
        setDescricao("");
        setDataInicio("");
        setDataConclusao("");
        setStatus("");
        setIdResponsavel("");
        setResetKey((k) => k + 1);
    };

    const salvar = (e) => {
        e.preventDefault();

        const projetos = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            dataInicio: dataInicio ? dataInicio : null,
            dataConclusao: dataConclusao ? dataConclusao : null,
            status: status || null,
            idResponsavel: idResponsavel ? Number(idResponsavel) : null,
        };

        api
            .post("/projetos", projetos)
            .then((response) => {
                console.log(response.data);
                alert("Seu projeto foi salvo com sucesso!");
                limparCampos();
            })
            .catch((error) => {
                console.error("Erro completo: ", error);
                if (error.response && error.response.data) {
                    console.log("Detalhes do erro do Java:", error.response.data);
                    alert("Erro ao salvar:" + JSON.stringify(error.response.data));
                } else {
                    alert("Erro ao salvar projeto. Verifique os dados");
                }
            });
    };

    const cancelar = () => {
        const confirmar = window.confirm(
            "Tem certeza que deseja cancelar?\n Os dados que não foram salvos serão perdidos. "
        );
        if (confirmar) {
            limparCampos();
        }
    };

    return (
        <div className="fundo-azul-pagina">
            <div className="container-projeto">
                <h1 className="titulo-projeto">Adicionar Novo Projeto</h1>

                <Form className="form-projeto" onSubmit={salvar}>
                    <div className="topo-form-projeto">
                        <Form.Group className="campo-projeto mb-3 flex-grow-1">
                            <Form.Label>
                                Nome do projeto: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome do projeto"
                                required
                            />
                        </Form.Group>

                        {/* type="button" evita que dispare o submit do formulário */}
                        <Button
                            type="button"
                            variant="success"
                            className="btn-lista-projetos"
                            onClick={abrirLista}
                        >
                            <i className="bi bi-list-check"></i> Lista de Projetos
                        </Button>
                    </div>

                    <Form.Group className="campo-projeto mb-3">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descreva o projeto"
                        />
                    </Form.Group>

                    <div className="alinhar-campos">
                        <Form.Group className="campo-projeto mb-3">
                            <Form.Label>
                                Data de início: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataInicio"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="campo-projeto mb-3">
                            <Form.Label>
                                Data de conclusão: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataConclusao"
                                value={dataConclusao}
                                min={dataInicio || undefined}
                                onChange={(e) => setDataConclusao(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    <div className="alinhar-campos">
                        <Form.Group className="campo-projeto mb-4">
                            <Form.Label>
                                Status: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="ATIVO">Ativo</option>
                                <option value="EM_ANDAMENTO">Em andamento</option>
                                <option value="CONCLUIDO">Concluído</option>
                                <option value="CANCELADO">Cancelado</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-projeto mb-4">
                            <Form.Label>
                                Responsável: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <CampoBusca
                                key={`responsavel-${resetKey}`}
                                id="idResponsavel"
                                opcoes={usuarios}
                                valorId={idResponsavel}
                                onSelecionar={setIdResponsavel}
                                placeholder="Digite o nome do responsável"
                                required
                            />
                            {!carregandoUsuarios && usuarios.length === 0 && (
                                <Form.Text className="text-danger d-block text-start">
                                    Nenhum usuário cadastrado.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </div>

                    <div className="botoes-projeto">
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

            {/* MODAL: lista de projetos com os campos de pesquisa */}
            <ListaDeProjetos show={mostrarLista} onHide={fecharLista} />
        </div>
    );
}

export default FormProjeto;