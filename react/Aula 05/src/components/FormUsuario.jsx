import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormUsuario.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function FormUsuario() {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [status, setStatus] = useState("");
    const [senhaTemporaria, setSenhaTemporaria] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

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
            senhaTemporaria
        };

        console.log(usuario);

        alert("Dados do usuário salvos com sucesso!");

        limparCampos();
    };

    const cancelar = () => {
        const confirmar = window.confirm(
            "Tem certeza de que deseja cancelar esta ação?\n\nOs dados que não foram salvos serão perdidos."
        );

        if (confirmar) {
            limparCampos();
        }
    };


    return (

        <div className="container-usuario">
            <h2 className="titulo-form">Adicionar novo Usuário</h2>

            <Form className="form-principal" onSubmit={salvar}>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nome" className="d-block text-start">
                        Nome:<span className="obrigatorio">*</span>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="cpf" className="d-block text-start">
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
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email" className="d-block text-start">E-mail:</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@email.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dataNascimento" className="d-block text-start">
                        Data de nascimento:<span className="obrigatorio">*</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        id="dataNascimento"
                        value={dataNascimento}
                        onChange={(e) =>
                            setDataNascimento(e.target.value)
                        }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="status" className="d-block text-start">Status:</Form.Label>
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

                <Form.Group className="mb-3">
                    <Form.Label
                        htmlFor="senhaTemporaria"
                        className="d-block text-start"
                    >
                        Senha temporária:
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


                <Button variant="primary" type="submit" className="btn01">
                    Adicionar Usuário
                </Button>{" "}

                <Button
                    variant="danger"
                    type="button"
                    onClick={cancelar}
                >
                    Cancelar
                </Button>

            </Form >
        </div>
    );
}

export default FormUsuario;

