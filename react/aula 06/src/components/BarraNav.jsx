import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import {
    BsFileEarmarkBarGraph,
    BsCardChecklist,
    BsRocketTakeoff,
    BsPersonBadgeFill,
    BsPersonCircle,
} from "react-icons/bs";
import logo from "../assets/logo_s1.png";
import "./BarraNav.css";

function BarraNav() {
    return (
        <Navbar expand="lg" className="barra-nav w-100" data-bs-theme="light">
            <Container fluid className="px-3 px-lg-4">
                <Navbar.Brand as={Link} to="/dashboard">
                    <img
                        alt="Sistema Gestão de Projetos"
                        src={logo}
                        height="56"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Menu central: o item da página atual fica azul automaticamente */}
                    <Nav className="mx-auto gap-2 align-items-lg-center">
                        <Nav.Link as={NavLink} to="/dashboard">
                            <BsFileEarmarkBarGraph size={18} /> Dashboard
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/tarefas">
                            <BsCardChecklist size={18} /> Tarefas
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/projetos">
                            <BsRocketTakeoff size={18} /> Projetos
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/usuarios">
                            <BsPersonBadgeFill size={18} /> Usuários
                        </Nav.Link>
                    </Nav>

                    {/* Usuário à direita */}
                    <Nav className="align-items-lg-center">
                        <NavDropdown
                            align="end"
                            id="menu-usuario"
                            title={
                                <span className="barra-nav-usuario">
                                    <BsPersonCircle size={32} className="barra-nav-avatar" />
                                    Manoel Amancio
                                </span>
                            }
                        >
                            <NavDropdown.Item href="#perfil">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#seguranca">Segurança</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNav;