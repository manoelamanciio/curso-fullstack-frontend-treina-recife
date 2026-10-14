import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormProjeto.css";

function FormProjeto() {
    const [nomeProjeto, setNomeProjeto] = useState("");
    const [descricaoProjeto, setDescricaoProjeto] = useState("");
    const [dataCriacaoProjeto, setDataCriacaoProjeto] = useState("");
    const [dataConclusao, setDataConclusaoProjeto] = useState("");
    const [statusProjeto, setStatusProjeto] = useState("");
    const [responsavelProjeto, setResponsavelProjeto] = useState("");

    const limparCampos = () => {
        setNomeProjeto("");
        setDescricaoProjeto("");
        setDataCriacaoProjeto("");
        setDataConclusaoProjeto("");
        setStatusProjeto("");
        setResponsavelProjeto("");
    };

    const salvar = (e) => {
        e.preventDefault();

        const projeto = {
            nomeProjeto: nomeProjeto.trim(),
            descricaoProjeto: descricaoProjeto.trim(),
            dataCriacaoProjeto,
            dataConclusao,
            statusProjeto,
            responsavelProjeto: responsavelProjeto.trim()
        };

        console.log("Dados do projeto:", projeto);
        alert("Dados do projeto preparados para envio!");

        limparCampos();
    };

    return (
        <div className="fundo-azul-pagina">
            <div className="container-projeto">
                <h1 className="titulo-projeto">Adicionar Novo Projeto</h1>

                <Form className="form-projeto" onSubmit={salvar}>

                    {/* Linha do Nome do Projeto + Botão Lista de Projetos */}
                    <div className="topo-form-projeto">
                        <Form.Group className="campo-projeto mb-3 flex-grow-1">
                            <Form.Label>
                                Nome do projeto: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="nomeProjeto"
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)}
                                placeholder="Digite o nome do projeto"
                                required
                            />
                        </Form.Group>
                        <Button variant="success" className="btn-lista-projetos" href="#lista">
                            <i className="bi bi-list-check"></i> Lista de Projetos
                        </Button>
                    </div>

                    {/* Descrição */}
                    <Form.Group className="campo-projeto mb-3">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="descricaoProjeto"
                            value={descricaoProjeto}
                            onChange={(e) => setDescricaoProjeto(e.target.value)}
                            placeholder="Descreva o projeto"
                        />
                    </Form.Group>

                    {/* Datas (Criação e Conclusão) */}
                    <div className="alinhar-campos">
                        <Form.Group className="campo-projeto mb-3">
                            <Form.Label>
                                Data de criação: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataCriacaoProjeto"
                                value={dataCriacaoProjeto}
                                onChange={(e) => setDataCriacaoProjeto(e.target.value)}
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
                                min={dataCriacaoProjeto || undefined}
                                onChange={(e) => setDataConclusaoProjeto(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    {/* Status e Responsável */}
                    <div className="alinhar-campos">
                        <Form.Group className="campo-projeto mb-4">
                            <Form.Label>
                                Status: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="statusProjeto"
                                value={statusProjeto}
                                onChange={(e) => setStatusProjeto(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Planejado">Planejado</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Concluído">Concluído</option>
                                <option value="Cancelado">Cancelado</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-projeto mb-4">
                            <Form.Label>
                                Responsável: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="responsavelProjeto"
                                value={responsavelProjeto}
                                onChange={(e) => setResponsavelProjeto(e.target.value)}
                                placeholder=""
                                required
                            />
                        </Form.Group>
                    </div>

                    {/* Botões Salvar e Cancelar */}
                    <div className="botoes-projeto">
                        <Button variant="success" type="submit" className="w-100 mb-2">
                            Salvar
                        </Button>

                        <Button
                            variant="outline-danger"
                            type="button"
                            className="w-100"
                            onClick={limparCampos}
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