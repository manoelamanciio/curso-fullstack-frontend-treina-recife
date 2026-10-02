import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import FormUsuario from "./FormUsuario"
import FormProjects from "./FormProjects"
import Dashboard from "./Dashboard"
function Home() {

    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Home</Link> | (" ")
                <Link to="/usuarios">USUARIOS</Link>  | (" ")
                <Link to="/projetos">PROJETOS</Link>  | (" ")
                <Link to="/tarefas">TAREFAS</Link> | (" ")
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />}> </Route>
                <Route path="/usuarios" element={<FormUsuario />}></Route>
            </Routes>

        </BrowserRouter>
    )

}

export default Home