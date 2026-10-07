import { useState } from "react"
import Button from 'react-bootstrap/Button';

function FormProjeto() {

    const [nomeProjeto, setNomeProjeto] = useState("")
    const [descricaoProjeto, setDescricaoProjeto] = useState("")
    const [dataCriacaoProjeto, setDataCriacaoProjeto] = useState("")
    const [dataConclusao, setDataConclusaoProjeto] = useState("")
    const [statusProjeto, setStatusProjeto] = useState("")
    const [responsavelProjeto, setResponsavelProjeto] = useState("")


    const salvar = () => {

        const projeto = {
            nomeProjeto: (nomProjeto),
            descricaoProjeto: (descricaoProjeto),
            dataCriacaoProjeto: (dataCriacaoProjeto),
            dataConclusao: (dataConclusao),
            statusProjeto: (statusProjeto),
            responsavelProjeto: (responsavelProjeto)
        }

        console.log(projeto)

    }

    return (
        <form>
            <label>Nome do Projeto: </label>
            <input type="text" value={nomeProjeto} onChange={(j) => setNomeProjeto(j.target.value)} /><br />

            <label>Descrição: </label>
            <input type="text" value={descricaoProjeto} onChange={(j) => setDescricaoProjeto(j.target.value)} /><br />

            <label>Data de Criação: </label>
            <input type="text" value={dataCriacaoProjeto} onChange={(j) => setDataCriacaoProjeto(j.target.value)} /><br />

            <label>Data de Conclusão: </label>
            <input type="text" value={dataConclusao} onChange={(j) => setDataConclusaoProjeto(j.target.value)} /><br />

            <label>Status: </label>
            <input type="text" value={statusProjeto} onChange={(j) => setStatusProjeto(j.target.value)} /><br />

            <label>Responsável: </label>
            <input type="text" value={responsavelProjeto} onChange={(j) => setResponsavelProjeto(j.target.value)} /><br />

            <Button variant="primary" className="btn01">Salvar</Button><br />
            
            <Button variant="danger">Deletar</Button>

        </form>
    )

}

export default FormProjeto