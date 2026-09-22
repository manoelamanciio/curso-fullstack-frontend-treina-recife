function usuario() {

    let nome = document.getElementById('nome').value
    let cpf = document.getElementById('cpf').value
    let email = document.getElementById('email').value
    let dataNascimento = document.getElementById('dataNascimento').value

    if (nome == '') {
        alert('Preencha o campo obrigratório');
        return
    }

    if (cpf == '') {
        alert('Preencha o campo obrigatório');
        return
    }

    if (email == '') {
        alert('Preencha o campo obrigatório');
        return
    }

    if(dataNascimento == ''){
        alert('Preencha o campo obrigatório');
        return
    }

    

}

