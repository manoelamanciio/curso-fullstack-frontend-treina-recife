import { useEffect, useState } from "react"



function ListarUSuarios() {

    const [usuario, setUSuario] = useState([]);

    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                setUSuario(data);

            }).catch(() => {

                alert('API não encontrada')
            })

    }, [])


    return (
        <div>
            <h2> Lista de USuarios </h2>

            <ol>
                {usuario.map((usu) => (
                    <li key={usu.id}>
                        {usu.name} - {usu.username}
                    </li>
                ))}


            </ol>

        </div>
    )


}

export default ListarUSuarios