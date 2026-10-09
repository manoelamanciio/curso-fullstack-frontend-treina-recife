import { useState } from "react"
import Button from 'react-bootstrap/Button';

function Usuario() {


    const [userId, setUserId] = useState("");
    const [Id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const salvarUsuario = () => {

        const usuario = {
            userId: 1,
            Id: Id,
            title: title,
            body: body
        }

        fetch('https://mockiapi.io', {
            method: "POST",
            header: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(usuario)

        }).then((response) => response.json())
            .then((data) => (
                console.log(data)
            )).catch((erro) => (

                console.log(erro)
            ))

    }
    <form>
        <label >Id: </label>
        <input type="text" value={Id} onChange={(e) => setId(e.target.value)} /><br />

        <label >title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />

        <label >body: </label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} /><br />

        <Button variant="primary" className="btn01" onClick={salvarUsuario}>Salvar</Button><br />
    </form>

}

export default Usuario