import { useState } from "react"
import Button from 'react-bootstrap/Button';



function FormTarefas() {

    const [tituloTarefa, setTituloTarefa] = useState("")
    const [prioridadeTarefa, setPrioridadeTarefa] = useState("")
    const [responsavelTarefa, setResponsavelTarefa] = ("")
    const [descricaoTarefa, setDescricaoTarefa] = ("")
    const [dataCriacaoTarefa, setDataCriacaoTarefa] = ("")
    const [dataConclusaoTarefa, setDataConclusaoTarefa] = ("")
    const [statusTarefa, setStatusTarefa] = ("")
    const [projetoTarefa, setProjetoTarefa] = ("")

    const salvar = () => {
        const tarefas = {
            tituloTarefa: (tituloTarefa),
            prioridadeTarefa: (prioridadeTarefa),
            responsavelTarefa: (responsavelTarefa),
            descricaoTarefa: (descricaoTarefa),
            dataCriacaoTarefa: (dataCriacaoTarefa),
            dataConclusaoTarefa: (dataConclusaoTarefa),
            statusTarefa: (statusTarefa),
            projetoTarefa: (projetoTarefa)

        }

        console.log(tarefas)

    }

    return (

        <form>
            <label>Titulo: </label>
            <input type="text" value={tituloTarefa} onChange={(n) => setTituloTarefa(n.target.value)} /><br />

            <label>Prioridade: </label>
            <input type="text" value={prioridadeTarefa} onChange={(n) => setPrioridadeTarefa(n.target.value)} /><br />

            <label>Responsavel: </label>
            <input type="text" value={responsavelTarefa} onChange={(n) => setResponsavelTarefa(n.target.value)} /><br />

            <label>Descrição: </label>
            <input type="text" value={descricaoTarefa} onChange={(n) => setDescricaoTarefa(n.target.value)} /><br />

            <label>Data de Criação: </label>
            <input type="text" value={dataCriacaoTarefa} onChange={(n) => setDataCriacaoTarefa(n.target.value)} /><br />

            <label>Data de Conclusão: </label>
            <input type="text" value={dataConclusaoTarefa} onChange={(n) => setDataConclusaoTarefa(n.target.value)} /><br />

            <label>Status: </label>
            <input type="text" value={statusTarefa} onChange={(n) => setStatusTarefa(n.target.value)} /><br />

            <label>Projeto: </label>
            <input type="text" value={projetoTarefa} onChange={(n) => setProjetoTarefa(n.target.value)} /><br />

            <Button variant="primary" className="btn01">Salvar</Button><br />
            <Button variant="danger">Deletar</Button>


        </form>

    )

}

export default FormTarefas