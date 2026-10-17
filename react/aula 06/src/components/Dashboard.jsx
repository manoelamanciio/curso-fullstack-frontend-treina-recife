import { useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import api from "../Api";
import "./Dashboard.css";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

/**
 * Status dos projetos exibidos no dashboard.
 * - "chave" é o valor que vem da API (enum do Spring)
 * - O card "Pendentes" está ligado ao status ATIVO. Se o seu enum tiver
 *   um status próprio para pendente, troque a chave aqui.
 */
const STATUS = [
    { chave: "CONCLUIDO", rotulo: "Concluídos", card: "Projetos Concluídos", cor: "#198754", icone: "bi-check-circle" },
    { chave: "EM_ANDAMENTO", rotulo: "Em Andamento", card: "Em Andamento", cor: "#0dcaf0", icone: "bi-arrow-repeat" },
    { chave: "ATIVO", rotulo: "Pendentes", card: "Pendentes", cor: "#ffc107", icone: "bi-exclamation-triangle" },
    { chave: "CANCELADO", rotulo: "Cancelados", card: "Cancelados", cor: "#dc3545", icone: "bi-x-circle" },
];

const NOMES_MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

// Aceita array simples ou página do Spring ({ content: [...] })
function extrairLista(data) {
    return Array.isArray(data) ? data : data?.content ?? [];
}

function obterIdResponsavel(projeto) {
    return projeto.idResponsavel ?? projeto.responsavel?.id ?? null;
}

// Últimos 12 meses, terminando no mês atual
function ultimosDozeMeses() {
    const hoje = new Date();
    const meses = [];

    for (let i = 11; i >= 0; i--) {
        const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const mes = String(data.getMonth() + 1).padStart(2, "0");

        meses.push({
            chave: `${data.getFullYear()}-${mes}`,
            rotulo: `${NOMES_MESES[data.getMonth()]}/${String(data.getFullYear()).slice(2)}`,
        });
    }

    return meses;
}

const opcoesBarra = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
    },
};

function Dashboard() {
    const [projetos, setProjetos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        Promise.all([api.get("/projetos"), api.get("/usuarios")])
            .then(([resProjetos, resUsuarios]) => {
                console.log("Dashboard - GET /projetos:", resProjetos.data);
                setProjetos(extrairLista(resProjetos.data));
                setUsuarios(extrairLista(resUsuarios.data));
            })
            .catch((error) => {
                console.error(error);
                setErro(true);
            })
            .finally(() => setCarregando(false));
    }, []);

    // Contagem por status (cards e gráfico de distribuição)
    const contagemPorStatus = STATUS.map(
        (s) => projetos.filter((p) => p.status === s.chave).length
    );

    // Projetos por mês (usa a data de início do projeto)
    const meses = ultimosDozeMeses();
    const projetosPorMes = meses.map(
        (m) => projetos.filter((p) => String(p.dataInicio ?? "").slice(0, 7) === m.chave).length
    );

    // Projetos por responsável
    const usuariosPorId = Object.fromEntries(usuarios.map((u) => [u.id, u.nome]));
    const contagemPorResponsavel = {};

    projetos.forEach((p) => {
        const id = obterIdResponsavel(p);
        const nome = usuariosPorId[id] ?? p.responsavel?.nome ?? (id ? `Usuário ${id}` : "Sem responsável");
        contagemPorResponsavel[nome] = (contagemPorResponsavel[nome] ?? 0) + 1;
    });

    const responsaveis = Object.entries(contagemPorResponsavel).sort((a, b) => b[1] - a[1]);

    const dadosDistribuicao = {
        labels: STATUS.map((s) => s.rotulo),
        datasets: [
            {
                data: contagemPorStatus,
                backgroundColor: STATUS.map((s) => s.cor),
                borderWidth: 1,
            },
        ],
    };

    const dadosMes = {
        labels: meses.map((m) => m.rotulo),
        datasets: [
            {
                label: "Projetos criados",
                data: projetosPorMes,
                backgroundColor: "rgba(13, 110, 253, 0.6)",
                borderColor: "#0d6efd",
                borderWidth: 1,
            },
        ],
    };

    const dadosResponsavel = {
        labels: responsaveis.map(([nome]) => nome),
        datasets: [
            {
                label: "Projetos",
                data: responsaveis.map(([, total]) => total),
                backgroundColor: "rgba(25, 135, 84, 0.6)",
                borderColor: "#198754",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-pagina">
            <h1 className="dashboard-titulo">
                <i className="bi bi-kanban-fill me-2"></i>
                Dashboard de Projetos
            </h1>

            <div className="dashboard-conteudo">
                {erro && (
                    <div className="alert alert-danger">
                        Não foi possível carregar os dados do dashboard. Verifique se a API está rodando.
                    </div>
                )}

                {carregando && <p className="text-white">Carregando...</p>}

                {/* Cards de resumo */}
                <div className="row g-3 mb-4">
                    {STATUS.map((s, i) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={s.chave}>
                            <div className="dashboard-kpi" style={{ backgroundColor: s.cor }}>
                                <i className={`bi ${s.icone}`}></i>
                                <div className="dashboard-kpi-valor">{contagemPorStatus[i]}</div>
                                <div>{s.card}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Distribuição por status e projetos por mês */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-lg-6">
                        <div className="dashboard-card">
                            <div className="dashboard-card-titulo">
                                <i className="bi bi-pie-chart-fill me-2"></i>
                                Distribuição por Status
                            </div>
                            <div className="dashboard-card-corpo">
                                <Doughnut
                                    data={dadosDistribuicao}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { position: "bottom" } },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="dashboard-card">
                            <div className="dashboard-card-titulo">
                                <i className="bi bi-calendar3 me-2"></i>
                                Projetos por Mês
                            </div>
                            <div className="dashboard-card-corpo">
                                <Bar data={dadosMes} options={opcoesBarra} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projetos por responsável */}
                <div className="dashboard-card">
                    <div className="dashboard-card-titulo">
                        <i className="bi bi-people-fill me-2"></i>
                        Projetos por Responsável
                    </div>
                    <div className="dashboard-card-corpo">
                        <Bar data={dadosResponsavel} options={opcoesBarra} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;