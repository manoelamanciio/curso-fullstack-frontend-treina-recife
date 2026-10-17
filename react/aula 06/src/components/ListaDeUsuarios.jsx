import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../Api";

const POR_PAGINA = 10;

const FILTROS_VAZIOS = { nome: "", cpf: "", email: "", status: "" };

function formatarCpf(cpf = "") {
    return cpf
        .replace(/\D/g, "")
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "-";
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

/**
 * Props:
 *  - show: controla se o modal está aberto (vem do pai)
 *  - onHide: função chamada ao fechar o modal
 */
function ListaDeUsuarios({ show, onHide }) {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    // valores digitados nos campos
    const [filtros, setFiltros] = useState(FILTROS_VAZIOS);
    // valores aplicados de fato (só mudam ao clicar em Filtrar)
    const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VAZIOS);

    const [pagina, setPagina] = useState(1);

    const carregarUsuarios = () => {
        setCarregando(true);
        api
            .get("/usuarios")
            .then((response) => {
                console.log("Resposta de GET /usuarios:", response.data);

                // Aceita array simples ou página do Spring ({ content: [...] })
                const dados = Array.isArray(response.data)
                    ? response.data
                    : response.data?.content ?? [];

                setUsuarios(dados);
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar os usuários.");
            })
            .finally(() => setCarregando(false));
    };

    // Busca os usuários toda vez que o modal é aberto
    useEffect(() => {
        if (show) {
            carregarUsuarios();
        }
    }, [show]);

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

    const excluir = (usuario) => {
        const confirmar = window.confirm(
            `Deseja realmente excluir o usuário "${usuario.nome}"?`
        );
        if (!confirmar) return;

        api
            .delete(`/usuarios/${usuario.id}`)
            .then(() => {
                alert("Usuário excluído com sucesso!");
                carregarUsuarios();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao excluir o usuário.");
            });
    };

    // Aplicação dos filtros
    const usuariosFiltrados = usuarios.filter((u) => {
        const { nome, cpf, email, status } = filtrosAplicados;

        const okNome =
            !nome || (u.nome || "").toLowerCase().includes(nome.toLowerCase());
        const okCpf =
            !cpf ||
            (u.cpf || "").replace(/\D/g, "").includes(cpf.replace(/\D/g, ""));
        const okEmail =
            !email || (u.email || "").toLowerCase().includes(email.toLowerCase());
        const okStatus = !status || u.status === status;

        return okNome && okCpf && okEmail && okStatus;
    });

    // Paginação
    const total = usuariosFiltrados.length;
    const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));
    const paginaAtual = Math.min(pagina, totalPaginas);
    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const usuariosPagina = usuariosFiltrados.slice(inicio, inicio + POR_PAGINA);

    const textoRegistros = `Mostrando ${total === 0 ? 0 : usuariosPagina.length} de ${total} registros`;

    const Paginacao = () => (
        <div className="d-flex justify-content-between align-items-center my-3">
            <span className="text-muted">{textoRegistros}</span>
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
                    <i className="bi bi-people-fill me-2"></i>
                    Lista de Usuários
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Botão Novo Usuário: fecha o modal e volta para o formulário */}
                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={onHide}>
                        <i className="bi bi-plus-lg"></i> Novo Usuário
                    </Button>
                </div>

                {/* Campos de pesquisa */}
                <Form onSubmit={filtrar}>
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <Form.Label htmlFor="filtroNome">Nome</Form.Label>
                            <Form.Control
                                id="filtroNome"
                                type="text"
                                placeholder="Filtrar por nome"
                                value={filtros.nome}
                                onChange={(e) => alterarFiltro("nome", e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <Form.Label htmlFor="filtroCpf">CPF</Form.Label>
                            <Form.Control
                                id="filtroCpf"
                                type="text"
                                placeholder="Filtrar por CPF"
                                maxLength={14}
                                value={filtros.cpf}
                                onChange={(e) =>
                                    alterarFiltro("cpf", formatarCpf(e.target.value))
                                }
                            />
                        </div>

                        <div className="col-md-3">
                            <Form.Label htmlFor="filtroEmail">E-mail</Form.Label>
                            <Form.Control
                                id="filtroEmail"
                                type="text"
                                placeholder="Filtrar por e-mail"
                                value={filtros.email}
                                onChange={(e) => alterarFiltro("email", e.target.value)}
                            />
                        </div>

                        <div className="col-md-3">
                            <Form.Label htmlFor="filtroStatus">Status</Form.Label>
                            <Form.Select
                                id="filtroStatus"
                                value={filtros.status}
                                onChange={(e) => alterarFiltro("status", e.target.value)}
                            >
                                <option value="">Todos</option>
                                <option value="ATIVO">Ativo</option>
                                <option value="INATIVO">Inativo</option>
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

                <Paginacao />

                {/* Tabela */}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>E-mail</th>
                                <th>Idade</th>
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
                            ) : usuariosPagina.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center text-muted py-4">
                                        Nenhum usuário encontrado.
                                    </td>
                                </tr>
                            ) : (
                                usuariosPagina.map((u) => (
                                    <tr key={u.id ?? u.cpf}>
                                        <td>{u.nome}</td>
                                        <td>{formatarCpf(u.cpf)}</td>
                                        <td>{u.email || "-"}</td>
                                        <td>{calcularIdade(u.dataNascimento)}</td>
                                        <td>
                                            <span
                                                className={`badge ${u.status === "ATIVO"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {u.status === "ATIVO"
                                                    ? "Ativo"
                                                    : u.status === "INATIVO"
                                                        ? "Inativo"
                                                        : "-"}
                                            </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => excluir(u)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Paginacao />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ListaDeUsuarios;