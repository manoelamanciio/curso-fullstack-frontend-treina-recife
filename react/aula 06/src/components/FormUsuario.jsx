import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormUsuario.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Api.js";
import ListaDeUsuarios from "./ListaDeUsuarios";

function FormUsuario() {
    // controla o modal da lista de usuários
    const [mostrarLista, setMostrarLista] = useState(false);

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [status, setStatus] = useState("");
    const [senhaTemporaria, setSenhaTemporaria] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const abrirLista = () => setMostrarLista(true);
    const fecharLista = () => setMostrarLista(false);

    const limparCampos = () => {
        setNome("");
        setCpf("");
        setEmail("");
        setDataNascimento("");
        setStatus("");
        setSenhaTemporaria("");
        setMostrarSenha(false);
    };

    const salvar = (e) => {
        e.preventDefault();

        if (!nome.trim() || !cpf || !dataNascimento) {
            alert(
                "Atenção! Preencha os campos obrigatórios: Nome, CPF e Data de nascimento."
            );
            return;
        }

        const cpfNumeros = cpf.replace(/\D/g, "");

        if (cpfNumeros.length !== 11) {
            alert("CPF inválido! Informe os 11 números do CPF.");
            return;
        }

        const usuario = {
            nome: nome.trim(),
            cpf: cpfNumeros,
            email,
            dataNascimento,
            status,
            senha: senhaTemporaria,
        };

        api
            .post("/usuarios", usuario)
            .then((response) => {
                console.log(response.data);
                alert("Dados do usuário salvos com sucesso!");
                limparCampos();
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao salvar o usuário.");
            });
    };

    const cancelar = () => {
        const confirmar = window.confirm(
            "Tem certeza de que deseja cancelar esta ação?\nOs dados que não foram salvos serão perdidos."
        );

        if (confirmar) {
            limparCampos();
        }
    };

    return (
        <>
            {/* FORMULÁRIO: direto na página, sem modal */}
            <div className="fundo-azul-pagina">
                <div className="container-usuario">
                    <h1 className="titulo-form">Adicionar Novo Usuário</h1>

                    <Form className="form-principal" onSubmit={salvar}>
                        {/* Topo com Nome e botão de Listagem para manter o padrão de Tarefas */}
                        <div className="topo-form-usuario">
                            <Form.Group className="campo-usuario mb-3 flex-grow-1">
                                <Form.Label htmlFor="nome" className="text-start d-block">
                                    Nome:<span className="obrigatorio">*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite o nome"
                                    required
                                />
                            </Form.Group>

                            {/* type="button" evita que dispare o submit do formulário */}
                            <Button
                                type="button"
                                variant="success"
                                className="btn-lista-usuarios"
                                onClick={abrirLista}
                            >
                                <i className="bi bi-list-check"></i> Lista de Usuários
                            </Button>
                        </div>

                        <Form.Group className="campo-usuario mb-3">
                            <Form.Label htmlFor="cpf" className="text-start d-block">
                                CPF:<span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="cpf"
                                value={cpf}
                                onChange={(e) =>
                                    setCpf(
                                        e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 11)
                                            .replace(/(\d{3})(\d)/, "$1.$2")
                                            .replace(/(\d{3})(\d)/, "$1.$2")
                                            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                                    )
                                }
                                placeholder="000.000.000-00"
                                maxLength={14}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="campo-usuario mb-3">
                            <Form.Label htmlFor="email" className="text-start d-block">
                                E-mail:
                            </Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@email.com"
                            />
                        </Form.Group>

                        <Form.Group className="campo-usuario mb-3">
                            <Form.Label
                                htmlFor="dataNascimento"
                                className="d-block text-start"
                            >
                                Data de Nascimento:<span className="obrigatorio">*</span>
                            </Form.Label>
                            <Form.Control
                                type="date"
                                id="dataNascimento"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="campo-usuario mb-3">
                            <Form.Label htmlFor="status" className="text-start d-block">
                                Status:
                            </Form.Label>
                            <Form.Select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Selecione o status</option>
                                <option value="ATIVO">Ativo</option>
                                <option value="INATIVO">Inativo</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="campo-usuario mb-4">
                            <Form.Label
                                htmlFor="senhaTemporaria"
                                className="text-start d-block"
                            >
                                Senha Temporária:
                            </Form.Label>
                            <div className="campo-senha">
                                <button
                                    type="button"
                                    className="botao-olho"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                <Form.Control
                                    type={mostrarSenha ? "text" : "password"}
                                    id="senhaTemporaria"
                                    value={senhaTemporaria}
                                    onChange={(e) => setSenhaTemporaria(e.target.value)}
                                    placeholder="Digite a senha"
                                />
                            </div>
                        </Form.Group>

                        <div className="botoes-usuario">
                            <Button variant="success" type="submit" className="w-100 mb-2">
                                Adicionar Usuário
                            </Button>

                            <Button
                                variant="outline-danger"
                                type="button"
                                className="w-100"
                                onClick={cancelar}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>

            {/* MODAL: só a lista de usuários com os campos de pesquisa */}
            <ListaDeUsuarios show={mostrarLista} onHide={fecharLista} />
        </>
    );
}

export default FormUsuario;