import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FormUsuario from "./FormUsuario"
import FormProjeto from "./FormProjeto"
import Dashboard from "./Dashboard"
import FormTarefas from "./FormTarefas"
import ListarUSuarios from "./ListarUsuarios"


function Home() {

    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Dashboard</Link> | {""}
                <Link to="/tarefas">Tarefas</Link> | {""}
                <Link to="/projetos">Projetos</Link>  | {""}
                <Link to="/usuarios">Usuários</Link>  | {""}
                <Link to="/listar-usuarios">Listar Usuarios</Link> | {""}
                <Link to="/usuario">Usuario</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/usuarios" element={<FormUsuario />}></Route>
                <Route path="/projetos" element={<FormProjeto />}></Route>
                <Route path="/tarefas" element={<FormTarefas />}></Route>
                <Route path="/listar-usuarios" element={<ListarUSuarios />}></Route>

            </Routes>


        </BrowserRouter>
    )

}

export default Home