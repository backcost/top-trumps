const drawCards = () => {
  let engineCardNumber = parseInt(Math.random() * 3)
  engineCard = cards[engineCardNumber]

  cards.splice(engineCardNumber, 1)
  let playerCardNumber = parseInt(Math.random() * 2)
  playerCard = cards[playerCardNumber]

  document.getElementById("drawCardsButton").disabled = true
  document.getElementById("playButton").disabled = false
  showPlayerCard()
}

const obtematributeselecionado = () => {
  let radioAtributo = document.getElementsByName("atributo")
  for (let i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value
    }
  }
}

const jogar = () => {
  console.log("chamou");
  let atributeselecionado = obtematributeselecionado()
  let divResultado = document.getElementById("resultado")

  if (
    playerCard.atributes[atributeselecionado] >
    engineCard.atributes[atributeselecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Venceu</p>"
  } else if (
    playerCard.atributes[atributeselecionado] <
    engineCard.atributes[atributeselecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Perdeu</p>"
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou</p>"
  }
  divResultado.innerHTML = htmlResultado

  document.getElementById("btnJogar").disabled = true
  exibirengineCard()
}

const  showPlayerCard = () => {
  let divplayerCard = document.getElementById("carta-jogador")
  divplayerCard.style.backgroundImage = `url(${playerCard.image})`
  let moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">'
  let tagHTML = "<div id='opcoes' class='carta-status'>"

  let opcoesTexto = ""
  for (let atributo in playerCard.atributes) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      playerCard.atributes[atributo] +
      "<br>"
  }
  let name = `<p class="carta-subtitle">${playerCard.name}</p>`

  divplayerCard.innerHTML = moldura + name + tagHTML + opcoesTexto + "</div>"
}

const  exibirengineCard = () => {
  let divengineCard = document.getElementById("carta-maquina")
  divengineCard.style.backgroundImage = `url(${engineCard.image})`
  let moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">'
  let tagHTML = "<div id='opcoes' class='carta-status'>"

  let opcoesTexto = ""
  for (let atributo in engineCard.atributes) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      engineCard.atributes[atributo] +
      "</p>"
  }
  let name = `<p class="carta-subtitle">${engineCard.name}</p>`

  divengineCard.innerHTML = moldura + name + tagHTML + opcoesTexto + "</div>"
}


let engineCard
let playerCard
let cards = [
  { name: "Blue-Eyes White Dragon",
    image: "https://www.duelshop.com.br/11007/blue-eyes-white-dragon-dpkb-en001-super-rare.jpg",
    atributes: {
      atack: 3000,
      defense: 2500,
      level: 8} 
  }, 
  { name: "Baby Dragon",
    image: "https://www.duelshop.com.br/15480-large_default/baby-dragon-ss02-enb06-common.jpg",
    atributes: {
      atack: 1200,
      defense: 700,
      level: 3} 
  },  
  { name: "Red-Eyes Black Dragon",
    image: "https://www.duelshop.com.br/2309-large_default/red-eyes-b-dragon-mil1-en027-common.jpg",
    atributes: {
      atack: 2400,
      defense: 2000,
      level: 7} 
  }
]



/*   Verificar o que acontece caso você não selecione nenhum dos 
atributes e como solucionar

Adicionar a image do personagem assim que você selecionar a carta 
dele 

Criar de fato um baralho, com várias outras cards

Desenvolver um sistema em que a cada carta que um jogador ganhe, 
ele fique com a carta do oponente e vice versa

Transformar as funções exibirengineCard() e showPlayerCard() 
em apenas uma, chamada exibirCarta(), utilizando para isso a 
passagem de parâmetros

Utilizar seus personagens e jogos preferidos nesse projeto
*/