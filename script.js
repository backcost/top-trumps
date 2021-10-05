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
      <div id="engine__card" class=""></div>
    </div>
  </form>

  <button class="container__button" type="button" id="playButton" onclick="play()">
    It's time to DUEL!
  </button>
  </div>`
}

const showsEngineCard = () => {
  let textOptions = ""
  for (let attribute in engineCard.attributes) {
    textOptions += `
    <input type='hidden'>${attribute}: ${engineCard.attributes[attribute]}<br>`
  }

  document.getElementById("engine__card").classList.toggle('engine__card')
  document.getElementById("engine__card").innerHTML = 
  `<img class="card__image" alt="${engineCard.name} Image" src="${engineCard.image}"/>
  <div class="card__attributes">${textOptions}</div>`
}

const play = () => {
  let selectedAttributes, result
  let radioAttribute = document.getElementsByName("attribute")
  for (let i = 0; i < radioAttribute.length; i++) {
    if (radioAttribute[i].checked) {
      selectedAttributes = radioAttribute[i].value
      break
    }
  }
  if (playerCard.attributes[selectedAttributes] > engineCard.attributes[selectedAttributes]) {
    result = "You win!"
  } else if (playerCard.attributes[selectedAttributes] < engineCard.attributes[selectedAttributes]) {
    result = "Wasted!"
  } else {
    result = "Draw"
  }

  document.getElementById("playButton").disabled = true
  document.getElementById("playButton").innerHTML = `<h2 class='container__result'>${result}</h2>`
  showsEngineCard()
}


let engineCard
let playerCard
let cards = [
  { name: "Blue-Eyes White Dragon",
    image: "imgs/BlueEyesWhiteDragon-LDS2-EN-UR-1E.png",
    attributes: {
      Atack: 3000,
      Defense: 2500,
      Level: 8} 
  }, 
  { name: "Baby Dragon",
    image: "imgs/BabyDragon-SS02-EN-C-1E.png",
    attributes: {
      Atack: 1200,
      Defense: 700,
      Level: 3} 
  },  
  { name: "Red-Eyes Black Dragon",
    image: "imgs/RedEyesBlackDragon-LDS1-EN-UR-1E-Blue.png",
    attributes: {
      Atack: 2400,
      Defense: 2000,
      Level: 7} 
  },  
  { name: "Dark Magician",
    image: "imgs/DarkMagician-DUPO-EN-UR-LE.png",
    attributes: {
      Atack: 2500,
      Defense: 2100,
      Level: 7} 
  },  
  { name: "Summoned Skull",
    image: "imgs/SummonedSkull-MIL1-EN-C-1E.png",
    attributes: {
      Atack: 2500,
      Defense: 1200,
      Level: 6} 
  }
]



/*   Verificar o que acontece caso você não selecione nenhum dos 
attributes e como solucionar

Criar de fato um baralho, com várias outras cards

Desenvolver um sistema em que a cada carta que um jogador ganhe, 
ele fique com a carta do oponente e vice versa

Transformar as funções showsEngineCard() e showsPlayerCard() 
em apenas uma, chamada exibirCarta(), utilizando para isso a 
passagem de parâmetros
*/