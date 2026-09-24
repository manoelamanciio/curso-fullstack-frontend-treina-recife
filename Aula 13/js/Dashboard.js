

function consultarUsuarios() {

    let qtd = JSON.parse(localStorage.getItem("usuarios") || '[]');

    let result = qtd.length;
    document.getElementById('qtdUsuarios').innerHTML = result

    // o filter ele retorna um novo array
    // aplicar essa logica em projetos
    let inativos = qtd.filter(k => k.status == 'inativo').length
    document.getElementById('usuInativo').innerHTML = inativos

}
// adicionar a essa function um filtro para contar o numero de inativos e retonar o valor
function gerarGrafico() {

    const area = document.getElementById('grafico')
    const dados = {
        labels: [1, 2, 3, 4, 5],
        datasets: [{
            data: [203, 384, 199, 234, 463],
            label: "Valores"
        }, {
            data: [40, 38, 19, 23, 43],
            label: "Inativos"
        }]
    }

    const myChart = new Chart(area, {
        type: 'line',
        data: dados

    })

}

consultarUsuarios()
gerarGrafico()