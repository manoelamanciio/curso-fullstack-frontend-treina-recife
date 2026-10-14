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
    const [definirLembrete, setDefinirLembrete] = useState(false);

    const limparCampos = () => {
        setTituloTarefa("");
        setPrioridadeTarefa("");
        setResponsavelTarefa("");
        setDescricaoTarefa("");
        setDataCriacaoTarefa("");
        setDataConclusaoTarefa("");
        setStatusTarefa("");
        setProjetoTarefa("");
        setDefinirLembrete(false);
    };

    const salvar = (e) => {
        e.preventDefault();

        const tarefas = {
            tituloTarefa: tituloTarefa.trim(),
            prioridadeTarefa,
            responsavelTarefa: responsavelTarefa.trim(),
            descricaoTarefa: descricaoTarefa.trim(),
            dataCriacaoTarefa,
            dataConclusaoTarefa,
            statusTarefa,
            projetoTarefa: projetoTarefa.trim(),
            definirLembrete
        };

        console.log("Dados da tarefa:", tarefas);
        alert("Dados preparados! Confira a tarefa no console do navegador.");

        limparCampos();
    };

    return (
        <div className="fundo-azul-pagina">
            <div className="container-tarefa">
                <h1 className="titulo-tarefa" >Adicionar Nova Tarefa</h1>

                <Form className="form-tarefa" onSubmit={salvar}>
                    {/* Cabeçalho do formulário com o botão Lista de Tarefas */}
                    <div className="topo-form-tarefa">
                        <Form.Group className="campo-tarefa mb-3 flex-grow-1">
                            <Form.Label className="text-start d-block">
                                Título:<span className="obrigatorio">*</span>
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
                        <Button variant="success" className="btn-lista-tarefas" href="#lista">
                            <i className="bi bi-list-check" ></i> Lista de Tarefas
                        </Button>
                    </div>

                    {/* Linha 1: Prioridade e Responsável */}
                    <div className="alinhar-campos-tarefa">
                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Prioridade: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="prioridadeTarefa"
                                value={prioridadeTarefa}
                                onChange={(e) => setPrioridadeTarefa(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Urgente">Urgente</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Responsável: <span className="obrigatorio">*</span>
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
                    </div>

                    {/* Linha 2: Descrição */}
                    <Form.Group className="campo-tarefa mb-3">
                        <Form.Label className="text-start d-block">Descrição:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="descricaoTarefa"
                            value={descricaoTarefa}
                            onChange={(e) => setDescricaoTarefa(e.target.value)}
                            placeholder="Descreva a tarefa"
                        />
                    </Form.Group>

                    {/* Linha 3: Data de Criação e Data de Conclusão */}
                    <div className="alinhar-campos-tarefa">
                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Data de criação: <span className="obrigatorio">*</span>
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
                            <Form.Label className="text-start d-block">
                                Data de conclusão: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataConclusaoTarefa"
                                value={dataConclusaoTarefa}
                                min={dataCriacaoTarefa || undefined}
                                onChange={(e) => setDataConclusaoTarefa(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>

                    {/* Linha 4: Status e Projeto */}
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
                                <option value="Pendente">Pendente</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Concluída">Concluída</option>
                                <option value="Cancelada">Cancelada</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-tarefa mb-3">
                            <Form.Label className="text-start d-block">
                                Projeto: <span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Select
                                id="projetoTarefa"
                                value={projetoTarefa}
                                onChange={(e) => setProjetoTarefa(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Projeto A">Projeto A</option>
                                <option value="Projeto B">Projeto B</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {/* Linha 5: Checkbox Lembrete */}
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

                    {/* Linha 6: Botões */}
                    <div className="botoes-tarefa">
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

export default FormTarefas;