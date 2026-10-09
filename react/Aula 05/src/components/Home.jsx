import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FormUsuario from "./FormUsuario"
import FormProjeto from "./FormProjeto"
import Dashboard from "./Dashboard"
import FormTarefas from "./FormTarefas"
import Button from 'react-bootstrap/Button';
import ListarUSuarios from "./ListarUsuarios"

function Home() {

    return (
        <BrowserRouter>

            <nav>
                <Link to="/">DASHBOARD</Link> | {""}
                <Link to="/usuarios">USUARIOS</Link>  | {""}
                <Link to="/projetos">PROJETOS</Link>  | {""}
                <Link to="/tarefas">TAREFAS</Link> | {""}
                <Link to="/listar-usuarios">LISTAR USUARIOS</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />}> </Route>
                <Route path="/usuarios" element={<FormUsuario />}></Route>
                <Route path="/projetos" element={<FormProjeto />}></Route>
                <Route path="/tarefas" element={<FormTarefas />}></Route>
                <Route path="/listar-usuarios" element={<ListarUSuarios/>}></Route>
            </Routes>


        </BrowserRouter>
    )

}

export default Home