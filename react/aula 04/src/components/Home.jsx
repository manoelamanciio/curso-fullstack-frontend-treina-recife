import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FormUsuario from "./FormUsuario"
import FormProjeto from "./FormProjeto"
import Dashboard from "./Dashboard"
import FormTarefas from "./FormTarefas"


function Home() {

    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Home</Link> | {""}
                <Link to="/usuarios">USUARIOS</Link>  | {""}
                <Link to="/projetos">PROJETOS</Link>  | {""}
                <Link to="/tarefas">TAREFAS</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />}> </Route>
                <Route path="/usuarios" element={<FormUsuario />}></Route>
                <Route path="/projetos" element={<FormProjeto />}></Route>
                <Route path="/tarefas" element={<FormTarefas />}></Route>
            </Routes>

        </BrowserRouter>
    )

}

export default Home