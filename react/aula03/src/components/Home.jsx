import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

function Home() {

    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> | (" ")
                <Link to="/usuarios">USUARIOS</Link>
                <Link to="/projetos">PROJETOS</Link>
                <Link to="/tarefas">TAREFAS</Link>
            </nav>

            <Routes>
                <route path="/usuarios" element></route>
        </Routes>

        </BrowserRouter >
)

}

export default Home