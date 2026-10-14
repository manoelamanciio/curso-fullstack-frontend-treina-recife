
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormTarefas.css";

function FormTarefas() {
    const [tituloTarefa, setTituloTarefa] = useState("");
    const [prioridadeTarefa, setPrioridadeTarefa] = useState("");
    const [responsavelTarefa, setResponsavelTarefa] = useState("");
    const [descricaoTarefa, setDescricaoTarefa] = useState("");
    const [dataCriacaoTarefa, setDataCriacaoTarefa] = useState("");
    const [dataConclusaoTarefa, setDataConclusaoTarefa] = useState("");
    const [statusTarefa, setStatusTarefa] = useState("");
    const [projetoTarefa, setProjetoTarefa] = useState("");

    const limparCampos = () => {
        setTituloTarefa("");
        setPrioridadeTarefa("");
        setResponsavelTarefa("");
        setDescricaoTarefa("");
        setDataCriacaoTarefa("");
        setDataConclusaoTarefa("");
        setStatusTarefa("");
        setProjetoTarefa("");
    };

    const salvar = (e) => {
        e.preventDefault();

        const tarefa = {
            tituloTarefa: tituloTarefa.trim(),
            prioridadeTarefa,
            responsavelTarefa: responsavelTarefa.trim(),
            descricaoTarefa: descricaoTarefa.trim(),
            dataCriacaoTarefa,
            dataConclusaoTarefa,
            statusTarefa,
            projetoTarefa: projetoTarefa.trim()
        };

        console.log("Dados da tarefa:", tarefa);
        alert("Dados preparados! Confira a tarefa no console do navegador.");

        limparCampos();
    };

    return (
        <div className="container-tarefa">
            <h1 className="titulo-tarefa">Adicionar Tarefa</h1>

            <Form className="form-tarefa" onSubmit={salvar}>
                <Form.Group className="campo-tarefa mb-3">
                    <Form.Label>
                        Título <span className="obrigatorio">*</span>
                    </Form.Label>

                    <Form.Control
                        type="text"
                        id="tituloTarefa"
                        value={tituloTarefa}
                        onChange={(e) => setTituloTarefa(e.target.value)}
                        placeholder="Digite o título da tarefa"
                        required
                    />
                </Form.Group>

                <Form.Group className="campo-tarefa mb-3">
                    <Form.Label>Descrição</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={4}
                        id="descricaoTarefa"
                        value={descricaoTarefa}
                        onChange={(e) => setDescricaoTarefa(e.target.value)}
                        placeholder="Descreva o que precisa ser realizado"
                    />
                </Form.Group>

                <div className="alinhar-campos-tarefa">
                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label>
                            Prioridade <span className="obrigatorio">*</span>
                        </Form.Label>

                        <Form.Select
                            id="prioridadeTarefa"
                            value={prioridadeTarefa}
                            onChange={(e) => setPrioridadeTarefa(e.target.value)}
                            required
                        >
                            <option value="">Selecione a prioridade</option>
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                            <option value="Urgente">Urgente</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label>
                            Status <span className="obrigatorio">*</span>
                        </Form.Label>

                        <Form.Select
                            id="statusTarefa"
                            value={statusTarefa}
                            onChange={(e) => setStatusTarefa(e.target.value)}
                            required
                        >
                            <option value="">Selecione o status</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluída">Concluída</option>
                            <option value="Cancelada">Cancelada</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className="alinhar-campos-tarefa">
                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label>
                            Data de Criação <span className="obrigatorio">*</span>
                        </Form.Label>

                        <Form.Control
                            type="date"
                            id="dataCriacaoTarefa"
                            value={dataCriacaoTarefa}
                            onChange={(e) => setDataCriacaoTarefa(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label>Data de Conclusão</Form.Label>

                        <Form.Control
                            type="date"
                            id="dataConclusaoTarefa"
                            value={dataConclusaoTarefa}
                            min={dataCriacaoTarefa || undefined}
                            onChange={(e) => setDataConclusaoTarefa(e.target.value)}
                        />
                    </Form.Group>
                </div>

                <Form.Group className="campo-tarefa mb-3">
                    <Form.Label>
                        Responsável <span className="obrigatorio">*</span>
                    </Form.Label>

                    <Form.Control
                        type="text"
                        id="responsavelTarefa"
                        value={responsavelTarefa}
                        onChange={(e) => setResponsavelTarefa(e.target.value)}
                        placeholder="Digite o nome do responsável"
                        required
                    />
                </Form.Group>

                <Form.Group className="campo-tarefa mb-4">
                    <Form.Label>
                        Projeto <span className="obrigatorio">*</span>
                    </Form.Label>

                    <Form.Control
                        type="text"
                        id="projetoTarefa"
                        value={projetoTarefa}
                        onChange={(e) => setProjetoTarefa(e.target.value)}
                        placeholder="Digite o nome do projeto"
                        required
                    />
                </Form.Group>

                <div className="botoes-tarefa">
                    <Button variant="primary" type="submit">
                        Salvar Tarefa
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

export default FormTarefas;