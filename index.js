// objeto javascript

let participantes = [
  {
    nome: "Victor Hugo Borges",
    email: "victorhugoborges08@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataChekIn: null
  },
  {
    nome: "João",
    email: "joaoantonio@gmail.com",
    dataInscricao: new Date(2023, 2, 12, 14, 20),
    dataChekIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    dataInscricao: new Date(2024, 3, 1, 10, 30),
    dataChekIn: new Date(2024, 3, 3, 15, 45)
  },
  {
    nome: "José Oliveira",
    email: "jose.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 2, 8, 0),
    dataChekIn: new Date(2024, 3, 4, 12, 30)
  },
  {
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    dataInscricao: new Date(2024, 3, 3, 14, 20),
    dataChekIn: new Date(2024, 3, 5, 18, 45)
  },
  {
    nome: "Pedro Santos",
    email: "pedro.santos@example.com",
    dataInscricao: new Date(2024, 3, 4, 11, 10),
    dataChekIn: new Date(2024, 3, 6, 9, 20)
  },
  {
    nome: "Carla Lima",
    email: "carla.lima@example.com",
    dataInscricao: new Date(2024, 3, 5, 16, 5),
    dataChekIn: null
  },
  {
    nome: "Luiz Gonzaga",
    email: "luiz.gonzaga@example.com",
    dataInscricao: new Date(2024, 3, 6, 9, 30),
    dataChekIn: new Date(2024, 3, 8, 12, 15)
  },
  {
    nome: "Rafaela Pereira",
    email: "rafaela.pereira@example.com",
    dataInscricao: new Date(2024, 3, 7, 14, 50),
    dataChekIn: new Date(2024, 3, 9, 17, 30)
  },
  {
    nome: "Fernando Oliveira",
    email: "fernando.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 8, 10, 15),
    dataChekIn: new Date(2024, 3, 10, 8, 45)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataChekIn = dayjs(Date.now()).to(participante.dataChekIn)

  if(participante.dataChekIn == null){
    dataChekIn = `
      <button
        data-email="${participante.email}"
        onclick = "fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    
    `
  }
  return `<tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataChekIn}</td>
    </tr>
    `
}


const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
} // arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataChekIn: null
  }

  // verificar se o participante já existe

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )
  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }
  participantes = [participante, ...participantes]

  atualizarLista(participantes)

  // limpar formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false){
    return 
  }
  // encontrar participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataChekIn = new Date()

  // atualizar a lista do participante
  atualizarLista(participantes)
}