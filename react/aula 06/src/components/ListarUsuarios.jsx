import { useEffect, useState } from "react"
import axios from "axios";

function ListarUSuarios() {

    const [usuarios, setUSuarios] = useState([]);

    useEffect(() => {
        axios.get("/usuarios")
            .then((response) => {
                setUSuarios(response.data)
                console.log(response.data);
                setUSuarios(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao carregar");
            })
    }, [])


    return (
        <div>
            <h2> Lista de Usuários </h2>

            <ol>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.nome} - {usuario.email}
                    </li>
                ))}
            </ol>

        </div>
    )

}

export default ListarUSuarios