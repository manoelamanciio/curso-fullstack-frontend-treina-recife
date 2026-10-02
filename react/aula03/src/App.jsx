import { useState } from "react";


function App() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const salvar = () => {

    const usuario = {
      nome: (nome),
      cpf: (cpf),
      email: (email),
      status: (status)
    }

    console.log(usuario)
  }

  return (
    <form>
      <label >Nome </label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /><br />

      <label >Cpf </label>
      <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} /><br />

      <label >Email </label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />

      <label >Status </label>
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /><br/>

      <button onClick={salvar}>Salvar</button>

    </form>

  )
}

export default App
