
function vallidar() {

    let nome = document.getElementById('nome').value;
    let cpf = document.getElementById('cpf').value;
    let email = document.getElementById('email').value;

    if (nome == '') {
        alert('Preencha o campo nome');
    }else{
        alert('O nome preenchido é: ' + nome )
    }

    if(cpf == ''){
        alert('Preencha o campo cpf');
    }

    if (email == '') {
        alert('Preencha o campo E-mail')
        
    }


}
