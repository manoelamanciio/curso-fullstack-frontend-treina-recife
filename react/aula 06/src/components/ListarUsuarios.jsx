import { useEffect, useState } from "react"
import axios from "axios";

function ListarUSuarios() {

    const [usuarios, setUSuario] = useState([0]);

    useEffect(() => {

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {setUSuario(response.data)})
        .catch(() => {
            alert("Erro ao carregar")
        })

    }, [])


    return (
        <div>
            <h2> Lista de Usuários </h2>

            <ol>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.name} - {usuario.email}
                    </li>
                ))}
            </ol>

        </div>
    )

}

export default ListarUSuarios