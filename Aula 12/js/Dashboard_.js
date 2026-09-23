function consultarUsuarios(){

    let dados = localStorage.getItem('usuarios') || '[]';
    let qtd = JSON.parse(dados);
    let result = qtd.length();
    document.getElementById('qtdUsuarios').innerHTML = result

    let inativos = qtd.filter(k =>k.status == 'Inativo').length()
    document.getElementById('qtdUsuarios').innerHTML = inativos

}

consultarUsuarios()
