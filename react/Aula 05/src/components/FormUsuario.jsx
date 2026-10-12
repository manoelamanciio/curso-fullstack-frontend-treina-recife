import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormUsuario.css";

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
        setSenhaTemporaria("")
        setMostrarSenha(false)

    }

    const salvar = (e) => {
        e.preventDefault();

        const usuario = {
            nome,
            cpf,
            email,
            dataNascimento,
            status,
            senhaTemporaria
        };

        console.log(usuario);
        limparCampos();
    };


    return (
        <div className="pagina-usuario">
            <Form className="form-principal" onSubmit={salvar}>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nome">Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="cpf">CPF:</Form.Label>
                    <Form.Control
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">E-mail:</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dataNascimento">
                        Data de nascimento:
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
                    <Form.Label htmlFor="status">Status:</Form.Label>
                    <Form.Select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="senhaTemporaria">
                        Senha temporária:
                    </Form.Label>

                    <Form.Control
                        type={mostrarSenha ? "text" : "password"}
                        id="senhaTemporaria"
                        value={senhaTemporaria}
                        onChange={(e) =>
                            setSenhaTemporaria(e.target.value)
                        }
                        placeholder="Digite a senha temporária"
                    />

                    <Form.Check
                        type="checkbox"
                        label="Mostrar senha"
                        checked={mostrarSenha}
                        onChange={(e) =>
                            setMostrarSenha(e.target.checked)
                        }
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn01">
                    Salvar
                </Button>{" "}

                <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                        setNome("");
                        setCpf("");
                        setEmail("");
                        setDataNascimento("");
                        setStatus("");
                        setSenhaTemporaria("");
                        setMostrarSenha(false);
                    }}
                >
                    Limpar
                </Button>

            </Form>
        </div>
    );
}

export default FormUsuario;

