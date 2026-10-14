
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
        <div className="container-projeto">
            <h1 className="titulo-projeto">
                Adicionar Novo Projeto
            </h1>

            <Form
                className="form-projeto"
                onSubmit={salvar}
            >
                <Form.Group className="campo-projeto mb-3">
                    <Form.Label>
                        Nome do Projeto <span className="obrigatorio">*</span>
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

                <Form.Group className="campo-projeto mb-3">
                    <Form.Label>Descrição</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={4}
                        id="descricaoProjeto"
                        value={descricaoProjeto}
                        onChange={(e) => setDescricaoProjeto(e.target.value)}
                        placeholder="Descreva os objetivos do projeto"
                    />
                </Form.Group>

                <div className="alinhar-campos">
                    <Form.Group className="campo-projeto mb-3">
                        <Form.Label>
                            Data de Criação <span className="obrigatorio">*</span>
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
                        <Form.Label>Data de Conclusão</Form.Label>

                        <Form.Control
                            type="date"
                            id="dataConclusao"
                            value={dataConclusao}
                            min={dataCriacaoProjeto || undefined}
                            onChange={(e) => setDataConclusaoProjeto(e.target.value)}
                        />
                    </Form.Group>
                </div>

                <div className="alinhar-campos">
                    <Form.Group className="campo-projeto mb-3">
                        <Form.Label>
                            Status <span className="obrigatorio">*</span>
                        </Form.Label>

                        <Form.Select
                            id="statusProjeto"
                            value={statusProjeto}
                            onChange={(e) => setStatusProjeto(e.target.value)}
                            required
                        >
                            <option value="">Selecione o status</option>
                            <option value="Planejado">Planejado</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="campo-projeto mb-4">
                        <Form.Label>
                            Responsável <span className="obrigatorio">*</span>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            id="responsavelProjeto"
                            value={responsavelProjeto}
                            onChange={(e) => setResponsavelProjeto(e.target.value)}
                            placeholder="Digite o nome do responsável"
                            required
                        />
                    </Form.Group>
                </div>

                <div className="botoes-projeto">
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Salvar Projeto
                    </Button>

                    <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={limparCampos}
                    >
                        Cancelar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default FormProjeto;