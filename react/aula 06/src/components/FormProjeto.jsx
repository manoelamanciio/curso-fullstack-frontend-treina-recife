import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormProjeto.css";
import axios from "axios";

function FormProjeto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [status, setStatus] = useState("");
    const [idResponsavel, setIdResponsavel] = useState("");

    const limparCampos = () => {
        setNome("");
        setDescricao("");
        setDataInicio("");
        setDataConclusao("");
        setStatus("");
        setIdResponsavel("");
    };

    const salvar = (e) => {
        e.preventDefault();

        const projetos = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            dataInicio: dataInicio ? dataInicio : null,
            dataConclusao: dataConclusao ? dataConclusao : null,
            status: status || null,
            idResponsavel: idResponsavel ? Number(idResponsavel) : null
        };

        axios.post("/projetos", projetos)
            .then((response) => {
                console.log(response.data);
                alert("Seu projeto foi salvo com sucesso!");
                limparCampos();
            })
            .catch((error) => {
                console.error("Erro completo: ", error);
                if (error.response && error.response.data) {
                    console.log("Detalhes do erro do Java:", error.response.data)
                    alert("Erro ao salvar:" + JSON.stringify(error.response.data))
                } else {
                    alert("Erro ao salvar projeto. Verifique os dados")
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
                        <Button variant="success" className="btn-lista-projetos" href="#lista">
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
                            <Form.Control
                                type="number"
                                id="idResponsavel"
                                value={idResponsavel}
                                onChange={(e) => setIdResponsavel(e.target.value)}
                                placeholder="Digite o ID do responsável"
                                required
                            />
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
        </div>
    );
}

export default FormProjeto;