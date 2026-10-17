import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../Api";

const POR_PAGINA = 10;

const FILTROS_VAZIOS = { status: "", prioridade: "", projeto: "" };

const STATUS = {
    PENDENTE: { texto: "Pendente", classe: "bg-warning text-dark" },
    EM_ANDAMENTO: { texto: "Em andamento", classe: "bg-primary" },
    CONCLUIDA: { texto: "Concluída", classe: "bg-success" },
};

const PRIORIDADE = {
    BAIXA: { texto: "Baixa", classe: "bg-secondary" },
    MEDIA: { texto: "Média", classe: "bg-info text-dark" },
    ALTA: { texto: "Alta", classe: "bg-danger" },
};

// Aceita array simples ou página do Spring ({ content: [...] })
function extrairLista(data) {
    return Array.isArray(data) ? data : data?.content ?? [];
}

function formatarData(data) {
    if (!data) return "-";
    const [ano, mes, dia] = String(data).slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
}

function obterIdProjeto(tarefa) {
    return tarefa.idProjeto ?? tarefa.projeto?.id ?? null;
}

/**
 * Props:
 *  - show: controla se o modal está aberto (vem do pai)
 *  - onHide: função chamada ao fechar o modal
 */
function ListaDeTarefas({ show, onHide }) {
    const [tarefas, setTarefas] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
    const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VAZIOS);
    const [pagina, setPagina] = useState(1);

    const carregar = () => {
        setCarregando(true);
        Promise.all([api.get("/tarefas"), api.get("/projetos")])
            .then(([resTarefas, resProjetos]) => {
                console.log("GET /tarefas:", resTarefas.data);
                console.log("GET /projetos:", resProjetos.data);
                setTarefas(extrairLista(resTarefas.data));
                setProjetos(extrairLista(resProjetos.data));
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar as tarefas.");
            })
            .finally(() => setCarregando(false));
    };

    // Recarrega toda vez que o modal é aberto
    useEffect(() => {
        if (show) {
            carregar();
        }
    }, [show]);

    const projetosPorId = Object.fromEntries(projetos.map((p) => [p.id, p]));

    const nomeDoProjeto = (tarefa) => {
        const id = obterIdProjeto(tarefa);
        return projetosPorId[id]?.nome ?? tarefa.projeto?.nome ?? (id ? `Projeto ${id}` : "-");
    };

    const alterarFiltro = (campo, valor) => {
        setFiltros((anterior) => ({ ...anterior, [campo]: valor }));
    };

    const filtrar = (e) => {
        e.preventDefault();
        setFiltrosAplicados(filtros);
        setPagina(1);
    };

    const limpar = () => {
        setFiltros(FILTROS_VAZIOS);
        setFiltrosAplicados(FILTROS_VAZIOS);
        setPagina(1);
    };

    const excluir = (tarefa) => {
        const confirmar = window.confirm(
            `Deseja realmente excluir a tarefa "${tarefa.titulo}"?`
        );
        if (!confirmar) return;

        api
            .delete(`/tarefas/${tarefa.id}`)
            .then(() => {
                alert("Tarefa excluída com sucesso!");
                carregar();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir a tarefa.");
            });
    };

    // Filtros
    const tarefasFiltradas = tarefas.filter((t) => {
        const { status, prioridade, projeto } = filtrosAplicados;
        const statusTarefa = t.statusTarefa ?? t.status;

        return (
            (!status || statusTarefa === status) &&
            (!prioridade || t.prioridade === prioridade) &&
            (!projeto || String(obterIdProjeto(t)) === projeto)
        );
    });

    // Paginação
    const total = tarefasFiltradas.length;
    const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const tarefasPagina = tarefasFiltradas.slice(inicio, inicio + POR_PAGINA);

    const paginacao = (
        <div className="d-flex justify-content-between align-items-center my-3">
            <span className="text-muted">
                Mostrando {tarefasPagina.length} de {total} registros
            </span>
            <div className="d-flex gap-3">
                <Button
                    variant="link"
                    className="text-decoration-none text-muted p-0"
                    disabled={paginaAtual <= 1}
                    onClick={() => setPagina(paginaAtual - 1)}
                >
                    <i className="bi bi-chevron-left"></i> Anterior
                </Button>
                <Button
                    variant="link"
                    className="text-decoration-none text-muted p-0"
                    disabled={paginaAtual >= totalPaginas}
                    onClick={() => setPagina(paginaAtual + 1)}
                >
                    Próximo <i className="bi bi-chevron-right"></i>
                </Button>
            </div>
        </div>
    );

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="bi bi-list-task me-2"></i>
                    Lista de Tarefas
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Nova Tarefa: fecha o modal e volta para o formulário */}
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={onHide}>
                        <i className="bi bi-plus-lg"></i> Nova Tarefa
                    </Button>
                </div>

                {/* Campos de pesquisa */}
                <Form onSubmit={filtrar}>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <Form.Label htmlFor="filtroStatus">Status</Form.Label>
                            <Form.Select
                                id="filtroStatus"
                                value={filtros.status}
                                onChange={(e) => alterarFiltro("status", e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="PENDENTE">Pendente</option>
                                <option value="EM_ANDAMENTO">Em andamento</option>
                                <option value="CONCLUIDA">Concluída</option>
                            </Form.Select>
                        </div>

                        <div className="col-md-4">
                            <Form.Label htmlFor="filtroPrioridade">Prioridade</Form.Label>
                            <Form.Select
                                id="filtroPrioridade"
                                value={filtros.prioridade}
                                onChange={(e) => alterarFiltro("prioridade", e.target.value)}
                            >
                                <option value="">Todas</option>
                                <option value="BAIXA">Baixa</option>
                                <option value="MEDIA">Média</option>
                                <option value="ALTA">Alta</option>
                            </Form.Select>
                        </div>

                        <div className="col-md-4">
                            <Form.Label htmlFor="filtroProjeto">Projeto</Form.Label>
                            <Form.Select
                                id="filtroProjeto"
                                value={filtros.projeto}
                                onChange={(e) => alterarFiltro("projeto", e.target.value)}
                            >
                                <option value="">Todos</option>
                                {projetos.map((p) => (
                                    <option key={p.id} value={String(p.id)}>
                                        {p.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="info" type="button" className="text-white" onClick={limpar}>
                            <i className="bi bi-eraser-fill"></i> Limpar
                        </Button>
                        <Button variant="success" type="submit">
                            <i className="bi bi-funnel-fill"></i> Filtrar
                        </Button>
                    </div>
                </Form>

                <hr />

                {paginacao}

                {/* Tabela */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Título</th>
                                <th>Projeto</th>
                                <th>Prioridade</th>
                                <th>Status</th>
                                <th>Conclusão</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carregando ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Carregando...
                                    </td>
                                </tr>
                            ) : tarefasPagina.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Nenhuma tarefa encontrada.
                                    </td>
                                </tr>
                            ) : (
                                tarefasPagina.map((t) => {
                                    const status = STATUS[t.statusTarefa ?? t.status];
                                    const prioridade = PRIORIDADE[t.prioridade];

                                    return (
                                        <tr key={t.id}>
                                            <td>{t.titulo}</td>
                                            <td>{nomeDoProjeto(t)}</td>
                                            <td>
                                                {prioridade ? (
                                                    <span className={`badge ${prioridade.classe}`}>
                                                        {prioridade.texto}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td>
                                                {status ? (
                                                    <span className={`badge ${status.classe}`}>
                                                        {status.texto}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td>{formatarData(t.dataConclusao)}</td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => excluir(t)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {paginacao}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ListaDeTarefas;