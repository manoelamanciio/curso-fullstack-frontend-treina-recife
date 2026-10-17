import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../Api";
import "bootstrap-icons/font/bootstrap-icons.css";

const POR_PAGINA = 10;

const FILTROS_VAZIOS = { nome: "", responsavel: "" };

const STATUS = {
    ATIVO: { texto: "Ativo", classe: "bg-success" },
    EM_ANDAMENTO: { texto: "Em andamento", classe: "bg-primary" },
    CONCLUIDO: { texto: "Concluído", classe: "bg-secondary" },
    CANCELADO: { texto: "Cancelado", classe: "bg-danger" },
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

function obterIdResponsavel(projeto) {
    return projeto.idResponsavel ?? projeto.responsavel?.id ?? null;
}

/**
 * Props:
 *  - show: controla se o modal está aberto (vem do pai)
 *  - onHide: função chamada ao fechar o modal
 */
function ListaDeProjetos({ show, onHide }) {
    const [projetos, setProjetos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
    const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VAZIOS);
    const [pagina, setPagina] = useState(1);

    const carregar = () => {
        setCarregando(true);
        Promise.all([api.get("/projetos"), api.get("/usuarios")])
            .then(([resProjetos, resUsuarios]) => {
                console.log("GET /projetos:", resProjetos.data);
                setProjetos(extrairLista(resProjetos.data));
                setUsuarios(extrairLista(resUsuarios.data));
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar os projetos.");
            })
            .finally(() => setCarregando(false));
    };

    // Recarrega toda vez que o modal é aberto
    useEffect(() => {
        if (show) {
            carregar();
        }
    }, [show]);

    const usuariosPorId = Object.fromEntries(usuarios.map((u) => [u.id, u]));

    const nomeDoResponsavel = (projeto) => {
        const id = obterIdResponsavel(projeto);
        return usuariosPorId[id]?.nome ?? projeto.responsavel?.nome ?? (id ? `Usuário ${id}` : "-");
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

    const excluir = (projeto) => {
        const confirmar = window.confirm(
            `Deseja realmente excluir o projeto "${projeto.nome}"?`
        );
        if (!confirmar) return;

        api
            .delete(`/projetos/${projeto.id}`)
            .then(() => {
                alert("Projeto excluído com sucesso!");
                carregar();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir o projeto.");
            });
    };

    // Filtros
    const projetosFiltrados = projetos.filter((p) => {
        const { nome, responsavel } = filtrosAplicados;

        const okNome =
            !nome || (p.nome || "").toLowerCase().includes(nome.toLowerCase());
        const okResponsavel =
            !responsavel || String(obterIdResponsavel(p)) === responsavel;

        return okNome && okResponsavel;
    });

    // Paginação
    const total = projetosFiltrados.length;
    const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const projetosPagina = projetosFiltrados.slice(inicio, inicio + POR_PAGINA);

    const paginacao = (
        <div className="d-flex justify-content-between align-items-center my-3">
            <span className="text-muted">
                Mostrando {projetosPagina.length} de {total} registros
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
                    <i className="bi bi-folder2-open me-2"></i>
                    Lista de Projetos
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Novo Projeto: fecha o modal e volta para o formulário */}
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={onHide}>
                        <i className="bi bi-plus-lg"></i> Novo Projeto
                    </Button>
                </div>

                {/* Campos de pesquisa */}
                <Form onSubmit={filtrar}>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-6">
                            <Form.Label htmlFor="filtroNomeProjeto">Nome do Projeto</Form.Label>
                            <Form.Control
                                id="filtroNomeProjeto"
                                type="text"
                                placeholder="Filtrar por nome do projeto"
                                value={filtros.nome}
                                onChange={(e) => alterarFiltro("nome", e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <Form.Label htmlFor="filtroResponsavel">Responsável</Form.Label>
                            <Form.Select
                                id="filtroResponsavel"
                                value={filtros.responsavel}
                                onChange={(e) => alterarFiltro("responsavel", e.target.value)}
                            >
                                <option value="">Todos</option>
                                {usuarios.map((u) => (
                                    <option key={u.id} value={String(u.id)}>
                                        {u.nome}
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
                                <th>Projeto</th>
                                <th>Responsável</th>
                                <th>Início</th>
                                <th>Conclusão</th>
                                <th>Status</th>
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
                            ) : projetosPagina.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Nenhum projeto encontrado.
                                    </td>
                                </tr>
                            ) : (
                                projetosPagina.map((p) => {
                                    const status = STATUS[p.status];

                                    return (
                                        <tr key={p.id}>
                                            <td>{p.nome}</td>
                                            <td>{nomeDoResponsavel(p)}</td>
                                            <td>{formatarData(p.dataInicio)}</td>
                                            <td>{formatarData(p.dataConclusao)}</td>
                                            <td>
                                                {status ? (
                                                    <span className={`badge ${status.classe}`}>
                                                        {status.texto}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => excluir(p)}
                                                >
                                                    <i className="bi bi-trash">Deletar</i>
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

export default ListaDeProjetos;