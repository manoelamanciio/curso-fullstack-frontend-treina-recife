function validar() {
  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;

  if (nome == "") {
    alert("preencha o campo Nome");
    return;
  } else {
    alert("o nome preenchido é: " + nome);
  }
  salvar();
}

function salvar() {
  let nome = document.getElementById("nome").value;
  let cpf = document.getElementById("cpf").value;
  let email = document.getElementById("email").value;
  let dataNascimento = document.getElementById("dataNascimento").value;
  let status = document.getElementById("status").value;

  const usuariosObj = {
    id: Date.now().toString(),
    nome: nome,
    cpf: cpf,
    email: email,
    dataNascimento: dataNascimento,
    status: status,
  };

  const recUsuario = JSON.parse(localStorage.getItem("usuarios")) || "[]";

  recUsuario.push(usuariosObj);

  localStorage.setItem("usuarios", JSON.stringify(recUsuario));

  alert("Usuário salvo com sucesso!");
}

// for (let a = 1; a <= 10; a++) {
//     console.log(a);
// }

// let k = 10;
// while (k < 15) {
//     k++;
//     console.log(k);
// }

// for(let i = 1; i<=20;i++){
//     if(i % 2 == 0 ){
//         console.log(i);
//     }
// }

// let numero = 7;
// for(let i = 1; i <= 10; i++){
//     let result = numero * i;
//     console.log(numero + "x " + i + "=" + result);

// }

// let senha = prompt('Digite sua senha');

// while(senha !== "1234"){
//     alert('senha incorreta');
//     let senha = prompt('Digite sua senha');
// }

// alert("Acesso permitido!");

//OBJETOS
// const compras = {

//     arroz: 5.00,
//     feijao: 10.00,
//     macarrao: 8.00,
//     acucar: 7.00

// }

// compras.oleo = 25.00
// delete compras.macarrao
// console.log(compras)

// const aluno = {
//     nome:"João",
//     idade: 30,
//     altura: 1.75,
//     cidade: "Recife",
//     teste: function () {
//         alert('teste')
//     }
// }

// aluno.nome = 'Maria'
// aluno.cidade = "Olinda"
// aluno.curso = "fullstack"
// aluno.time = "Sport"

// delete aluno.cidade
// delete aluno.curso

// console.log(aluno)

//ARRAY
// const frutas = ["melao","uva","banana","maca"]
// frutas[4] = "caju"

// console.log(frutas)

// for(let a = 0; a < frutas.length; a++){
//     console.log(frutas[a])
// }

// const numeros = [2,6,9,15]
// //  console.log(numeros)

// const numero_alterado = numeros.map(n => {
//     return n*2
// }
//)
// console.log(numero_alterado)

// const numero_filtrado = numeros.filter(n => {
//     return n > 6
// })
// console.log(numero_filtrado)

// const tarefas = [
//     {id:1,titulo:"Estudar JavaScript",status:"Pendente"},
//     {id:2,titulo:"FAzer atividades da aula",status:"Pendente"},
//     {id:3,titulo:"Estudar BootStrap",status:"Concluído"},
//     {id:4,titulo:"Criar projeto",status:"Concluído"}
// ]

// const tt =  tarefas.map(item => {
//     return item.status
//  })

// const tf = tarefas.filter(item => {
//     return item.status == "Concluído"
// })

//console.log(tf)

//MAP e FILTER
