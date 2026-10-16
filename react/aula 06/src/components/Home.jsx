import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FormUsuario from "./FormUsuario"
import FormProjeto from "./FormProjeto"
import Dashboard from "./Dashboard"
import FormTarefas from "./FormTarefas"
import BarraNav from "./BarraNav"
import ListaDeUsuarios from "./ListaDeUsuarios"


function Home() {

    return (
        <BrowserRouter>

            <BarraNav>
                <Link to="/">Dashboard</Link> | {""}
                <Link to="/tarefas">Tarefas</Link> | {""}
                <Link to="/projetos">Projetos</Link>  | {""}
                <Link to="/usuarios">Usuários</Link>  | {""}

            </BarraNav>

            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/usuarios" element={<FormUsuario />}></Route>
                <Route path="/projetos" element={<FormProjeto />}></Route>
                <Route path="/tarefas" element={<FormTarefas />}></Route>

            </Routes>


        </BrowserRouter>
    )

}

export default Home