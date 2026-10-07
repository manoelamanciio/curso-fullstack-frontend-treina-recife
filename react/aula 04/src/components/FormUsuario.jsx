import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormUsuario() {

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [status, setStatus] = useState("");
    const [senhaTemporaria, setSenhaTemporaria] = useState("")


    const salvar = () => {
        const usuario = {
            nome: (nome),
            cpf: (cpf),
            email: (email),
            dataNascimento: (dataNascimento),
            status: (status),
            senhaTemporaria: (senhaTemporaria)

        }

        console.log(usuario)
    }

    return (

        <form>
            <label >Nome: </label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /><br />

            <label >Cpf: </label>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} /><br />

            <label >Email: </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

            <label >Data de Nascimento: </label>
            <input type="text" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} /><br />

            <label >Status: </label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /><br />

            <label >Senha Temporária: </label>
            <input type="text" value={senhaTemporaria} onChange={(e) => setSenhaTemporaria(e.target.value)} /><br />

          <Button variant="primary" className="btn01">Salvar</Button><br/>
           <Button variant="danger">Deletar</Button>

        </form>


    )

}

export default FormUsuario