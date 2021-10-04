const drawCards = () => {
  let engineCardNumber = parseInt(Math.random() * cards.length)
  engineCard = cards[engineCardNumber]

  cards.splice(engineCardNumber, 1)
  let playerCardNumber = parseInt(Math.random() * (cards.length - 1))
  playerCard = cards[playerCardNumber]

  document.getElementById("drawCardsButton").disabled = true
  showsPlayerCard()

}

const showsPlayerCard = () => {
  let textOptions = ""
  for (let attribute in playerCard.attributes) {
    textOptions += `
    <input type='radio' name='attribute' value='${attribute}'>${attribute}: ${playerCard.attributes[attribute]}<br>`
  }

  document.getElementById("container__form").innerHTML = 
  `<form id="form" class="container__form">
    <h2 class="form__tittle">Choose attribute</h2>
    <div class="form__wrapper">
      <div id="player__card" class="player__card">
        <img class="card__image" alt="${playerCard.name} Image" src="${playerCard.image}"/>
        <div id="playerattributes" class="card__attributes">${textOptions}</div>
      </div>
      <div id="engine__card" class="engine__card"></div>
      </div>
    </div>
    </form>

  <button class="container__button" type="button" id="playButton" onclick="play()">
    It's time to DUEL!
  </button>

  <div id="result"></div>`
}

const showsEngineCard = () => {
  let textOptions = ""
  for (let attribute in engineCard.attributes) {
    textOptions += `
    <input type='text' name='attribute' value='${attribute}'>${attribute}: ${engineCard.attributes[attribute]}<br>`
  }

  document.getElementById("engine__card").innerHTML = 
  `<img class="card__image" alt="${engineCard.name} Image" src="${engineCard.image}"/>
  <div id="engineattributes" class="card__attributes">${textOptions}</div>`
}

const getAttributes = () => {
  let radioattribute = document.getElementsByName("attribute")
  for (let i = 0; i < radioattribute.length; i++) {
    if (radioattribute[i].checked) {
      return radioattribute[i].value
    }
  }
}

const play = () => {
  let selectedAttributes = getAttributes()
  let divResult = document.getElementById("result")

  if (
    playerCard.attributes[selectedAttributes] >
    engineCard.attributes[selectedAttributes]
  ) {
    htmlResult = "<p class='container__result'>You won!</p>"
  } else if (
    playerCard.attributes[selectedAttributes] <
    engineCard.attributes[selectedAttributes]
  ) {
    htmlResult = "<p class='container__result'>You Lose!</p>"
  } else {
    htmlResult = "<p class='container__result'>Draw</p>"
  }
  divResult.innerHTML = htmlResult

  document.getElementById("playButton").disabled = true
  showsEngineCard()
}


let engineCard
let playerCard
let cards = [
  { name: "Blue-Eyes White Dragon",
    image: "https://static.wikia.nocookie.net/yugioh/images/e/e5/BlueEyesWhiteDragon-LDS2-EN-UR-1E.png",
    attributes: {
      Atack: 3000,
      Defense: 2500,
      Level: 8} 
  }, 
  { name: "Baby Dragon",
    image: "https://static.wikia.nocookie.net/yugioh/images/c/c4/BabyDragon-SS02-EN-C-1E.png",
    attributes: {
      Atack: 1200,
      Defense: 700,
      Level: 3} 
  },  
  { name: "Red-Eyes Black Dragon",
    image: "https://static.wikia.nocookie.net/yugioh/images/7/79/RedEyesBlackDragon-LDS1-EN-UR-1E-Blue.png",
    attributes: {
      Atack: 2400,
      Defense: 2000,
      Level: 7} 
  },  
  { name: "Dark Magician",
    image: "https://static.wikia.nocookie.net/yugioh/images/b/b6/DarkMagician-DUPO-EN-UR-LE.png",
    attributes: {
      Atack: 2500,
      Defense: 2100,
      Level: 7} 
  }
]



/*   Verificar o que acontece caso você não selecione nenhum dos 
attributes e como solucionar

Adicionar a image do personagem assim que você selecionar a carta 
dele 

Criar de fato um baralho, com várias outras cards

Desenvolver um sistema em que a cada carta que um jogador ganhe, 
ele fique com a carta do oponente e vice versa

Transformar as funções showsEngineCard() e showsPlayerCard() 
em apenas uma, chamada exibirCarta(), utilizando para isso a 
passagem de parâmetros

Utilizar seus personagens e jogos preferidos nesse projeto
*/