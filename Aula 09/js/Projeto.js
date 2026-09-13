function projeto() {

    let nomeProjeto = document.getElementById('nome').value
    let descricaoProjeto = document.getElementById('descricao').value
    let dataCriacaoProjeto = document.getElementById('dataCriacao').value
    let dataConclusaoProjeto = document.getElementById('dataConclusao').value
    let statusProjeto = document.getElementById('status').value
    let responsavelProjeto = document.getElementById('responsavel').value

    if (nomeProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (descricaoProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (dataCriacaoProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (dataConclusaoProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (statusProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (responsavelProjeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }




}