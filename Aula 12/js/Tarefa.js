function tarefa() {

    let titulo = document.getElementById('titulo').value
    let prioridade = document.getElementById('prioridade').value
    let responsavel = document.getElementById('responsavel').value
    let descricao = document.getElementById('descricao').value
    let dataCriacao = document.getElementById('dataCriacao').value
    let dataConclusao = document.getElementById('dataConclusao').value
    let status = document.getElementById('status').value
    let projeto = document.getElementById('projeto').value


    if (titulo == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (prioridade == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (responsavel == '') {
        alert('Preencha o campo obrigatório')
        return
    }


    if (descricao == '') {
        alert('Preencha o campo obrigatório')
        return
    }


    if (dataCriacao == '') {
        alert('Preencha o campo obrigatório')
        return
    }


    if (dataConclusao == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (status == '') {
        alert('Preencha o campo obrigatório')
        return
    }

    if (projeto == '') {
        alert('Preencha o campo obrigatório')
        return
    }


}