const drawSingleCard = () => {
  let cardNumber = parseInt(Math.random() * cards.length);
  return cards.splice(cardNumber, 1);
}

const showsPlayerCard = () => {
  let textOptions = "";
  for (let attribute in playerCard.attributes) {
    textOptions += `
      <input class="card__radio" type='radio' name='attribute' value='${attribute}'>
      <label class="card__label">${attribute}: ${playerCard.attributes[attribute]}</label>
      </br>`;
  }
  
  document.getElementById("container__form").innerHTML = 
  `<form id="form" class="container__form">
    <h2 class="form__tittle" id="form__tittle">Choose attribute</h2>
    <div class="form__wrapper">
      <div id="player__card" class="player__card">
        <div id="playerattributes" class="card__attributes">${textOptions}</div>
        <img class="card__image" alt="${playerCard.name} Image" src="${playerCard.image}"/>
      </div>
      <div id="engine__card" class=""></div>
    </div>
  </form>
  <h2 id='errorMsg' class=''></h2>
  <button class="container__button" type="button" id="playButton" onclick="setTimeout(play, 600)">
    It's time to DUEL!
  </button>`;
};

const drawCards = () => {
  engineCard = drawSingleCard()[0];
  playerCard = drawSingleCard()[0];
  

  if (document.getElementById("drawCardsButton")) {
    document.getElementById("drawCardsButton").remove(self);
  }
  
  showsPlayerCard();
}

const showsEngineCard = () => {
  let textOptions = "";
  for (let attribute in engineCard.attributes) {
    textOptions += 
    `<input class="card__label" type='hidden'>${attribute}: ${engineCard.attributes[attribute]}
    </br>`;
  }
  document.getElementById("engine__card").classList.toggle("engine__card");
  document.getElementById("engine__card").innerHTML = 
  `<div class="card__attributes">${textOptions}</div>
  <img class="card__image" alt="${engineCard.name} Image" src="${engineCard.image}"/>`;
};

const play = () => {
  let selectedAttributes, result;
  let radioAttribute = document.getElementsByName("attribute");
  for (let i = 0; i < radioAttribute.length; i++) {
    if (radioAttribute[i].checked) {
      selectedAttributes = radioAttribute[i].value;
      break;
    }
  }
  if (selectedAttributes === undefined) {
    document.getElementById("errorMsg").innerHTML = 
    `<h2 id='result' class='container__result'>Choose an attribute</h2>`;
  } else {
    if (
      playerCard.attributes[selectedAttributes] >
      engineCard.attributes[selectedAttributes]
    ) {
      playerDeck.push(playerCard)
      playerDeck.push(engineCard)
      result = "YOU WIN!"
      if (playerDeck.length === 2) {
        setInterval("carouselControl(1)", 4500)
      }
    } else if (
      playerCard.attributes[selectedAttributes] <
      engineCard.attributes[selectedAttributes]
    ) {
      result = "YOU LOSE!";
    } else {
      result = "DRAW";
      cards.push(playerCard)
      cards.push(engineCard)
    }
    showsEngineCard();
    document.getElementById("playButton").remove(self);
    document.getElementById("errorMsg").remove(self);
    document.getElementById("form__tittle").innerHTML = "";
    document.getElementById("container__form").innerHTML += 
    `<h2 id='result' class='container__result'>${result}</h2>`
    if (cards.length < 2) {
      document.getElementById("container__form").innerHTML += 
      `<h2 class='form__tittle'>That's all folks!</h2>`
    } else {
      let elements = document.getElementsByClassName("card__radio")
      while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
      }
      document.getElementById("container__form").innerHTML += 
      `<button class="container__button" type="button" onclick="setTimeout(drawCards, 600)">
      Play again?
      </button>`
    }
    showsCarousel();
  }
}

const showsCarousel = () => {
  document.getElementById("container__form").innerHTML +=
  `<h2 class="form__deck">Your Deck:</h2>
   <div class="container__carousel">
    <div class="carousel__control--left" onclick="carouselControl(-1)">
      <i class="fas fa-angle-left"></i>
    </div>
    <div class="carousel__active" id="carousel__active">
      <img class="carousel__image" src="${playerDeck[actual].image}" alt="${playerDeck[actual].name} Image">
    </div>
    <div class="carousel__control--right" onclick="carouselControl(1)">
      <i class="fas fa-angle-right"></i>
    </div>
  </div>
  <h3 id="carousel__counter" class="carousel__counter">${actual+1}/${playerDeck.length}</h3>`
}

let actual = 0
const carouselControl = (direction) => {
  actual += direction
  if (actual >= playerDeck.length) {
    actual = 0;
  } else if (actual < 0) {
    actual = playerDeck.length - 1
  }
  document.getElementById("carousel__active").innerHTML = 
  `<img class="carousel__image" src="${playerDeck[actual].image}" alt="${playerDeck[actual].name} Image">`
  document.getElementById("carousel__counter").innerHTML = 
  `<h3 id="carousel__counter" class="carousel__counter">${actual+1}/${playerDeck.length}</h3>`
}

let playerDeck = []
let engineCard;
let playerCard;
let cards = [
  {
    name: "Blue-Eyes White Dragon",
    image: "imgs/BlueEyesWhiteDragon-LDS2-EN-UR-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/e/e5/BlueEyesWhiteDragon-LDS2-EN-UR-1E.png */
    attributes: {
      Atack: 3000,
      Defense: 2500,
      Level: 8,
    },
  },
  {
    name: "Baby Dragon",
    image: "imgs/BabyDragon-SS02-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/c/c4/BabyDragon-SS02-EN-C-1E.png */
    attributes: {
      Atack: 1200,
      Defense: 700,
      Level: 3,
    },
  },
  {
    name: "Red-Eyes Black Dragon",
    /* https://static.wikia.nocookie.net/yugioh/images/7/79/RedEyesBlackDragon-LDS1-EN-UR-1E-Blue.png */
    image: "imgs/RedEyesBlackDragon-LDS1-EN-UR-1E-Blue.png",
    attributes: {
      Atack: 2400,
      Defense: 2000,
      Level: 7,
    },
  },
  {
    name: "Dark Magician",
    image: "imgs/DarkMagician-DUPO-EN-UR-LE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/b/b6/DarkMagician-DUPO-EN-UR-LE.png */
    attributes: {
      Atack: 2500,
      Defense: 2100,
      Level: 7,
    },
  },
  {
    name: "Summoned Skull",
    image: "imgs/SummonedSkull-MIL1-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/7/7f/SummonedSkull-MIL1-EN-C-1E.png */
    attributes: {
      Atack: 2500,
      Defense: 1200,
      Level: 6,
    },
  },
  {
    name: "Gaia The Fierce Knight",
    image: "imgs/GaiaTheFierceKnight-MIL1-EN-R-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/7/75/GaiaTheFierceKnight-MIL1-EN-R-1E.png */
    attributes: {
      Atack: 2300,
      Defense: 2100,
      Level: 7,
    },
  },
  {
    name: "Curse of Dragon",
    image: "imgs/CurseofDragon-YGLD-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/c/c8/CurseofDragon-YGLD-EN-C-1E.png */
    attributes: {
      Atack: 2000,
      Defense: 1500,
      Level: 5,
    },
  },
  {
    name: "Time Wizard",
    image: "imgs/TimeWizard-LDK2-PTJ15.jpg",
    /* https://static.wikia.nocookie.net/yugioh/images/3/3d/TimeWizard-SS02-EN-C-1E.png */
    attributes: {
      Atack: 500,
      Defense: 400,
      Level: 2,
    },
  },
  {
    name: "Castle of Dark Illusions",
    image: "imgs/CastleofDarkIllusions-MRD-NA-C-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/0/0d/CastleofDarkIllusions-MRD-NA-C-UE.png */
    attributes: {
      Atack: 920,
      Defense: 1930,
      Level: 4,
    },
  },
  {
    name: "Obelisk the Tormentor",
    image: "imgs/ObelisktheTormentor-SBCB-EN-ScR-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/a/a7/ObelisktheTormentor-SBCB-EN-ScR-1E.png */
    attributes: {
      Atack: 4000,
      Defense: 4000,
      Level: 10,
    },
  },
  {
    name: "Celtic Guardian",
    image: "imgs/CelticGuardian-MIL1-EN-R-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/8/8f/CelticGuardian-MIL1-EN-R-1E.png */
    attributes: {
      Atack: 1400,
      Defense: 1200,
      Level: 4,
    },
  },
  {
    name: "Kuriboh",
    image: "imgs/Kuriboh-SS04-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/7/73/Kuriboh-SS04-EN-C-1E.png */
    attributes: {
      Atack: 300,
      Defense: 200,
      Level: 1,
    },
  },
  {
    name: "Cyber Harpie Lady",
    image: "imgs/CyberHarpieLady-LCJW-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/1/16/CyberHarpieLady-LCJW-EN-C-1E.png */
    attributes: {
      Atack: 1800,
      Defense: 1300,
      Level: 4,
    },
  },
  {
    name: "Gate Guardian",
    image: "imgs/GateGuardian-LCJW-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/0/03/GateGuardian-LCJW-EN-C-1E.png */
    attributes: {
      Atack: 3750,
      Defense: 3400,
      Level: 11,
    },
  },
  {
    name: "Jinzo",
    image: "imgs/Jinzo-LED7-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/4/4a/Jinzo-LED7-EN-C-1E.png */
    attributes: {
      Atack: 2400,
      Defense: 1500,
      Level: 6,
    },
  },
  {
    name: "Millennium Shield",
    image: "imgs/MillenniumShield-YS14-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/6/69/MillenniumShield-YS14-EN-C-1E.png */
    attributes: {
      Atack: 0,
      Defense: 3000,
      Level: 5,
    },
  },
  {
    name: "Mystical Elf",
    image: "imgs/MysticalElf-SBAD-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/a/a3/MysticalElf-SBAD-EN-C-1E.png */
    attributes: {
      Atack: 800,
      Defense: 2000,
      Level: 4,
    },
  },
  {
    name: "Lord of D.",
    image: "imgs/LordofD-SS02-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/c/c3/LordofD-SS02-EN-C-1E.png */
    attributes: {
      Atack: 1200,
      Defense: 1100,
      Level: 4,
    },
  },
  {
    name: "Hungry Burger",
    image: "imgs/HungryBurger-SRL-NA-C-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/2/2d/HungryBurger-SRL-NA-C-UE.png */
    attributes: {
      Atack: 2000,
      Defense: 1850,
      Level: 6,
    },
  },
  {
    name: "Man-Eater Bug",
    image: "imgs/ManEaterBug-LCYW-EN-C-1E.jpg",
    /* https://static.wikia.nocookie.net/yugioh/images/d/dc/ManEaterBug-LCYW-EN-C-1E.jpg */
    attributes: {
      Atack: 450,
      Defense: 600,
      Level: 2,
    },
  },
  {
    name: "Shadow Ghoul",
    image: "imgs/ShadowGhoul-LCJW-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/8/8d/ShadowGhoul-LCJW-EN-C-1E.png */
    attributes: {
      Atack: 1600,
      Defense: 1300,
      Level: 5,
    },
  },
  {
    name: "Saggi the Dark Clown",
    image: "imgs/SaggitheDarkClown-DPKB-EN-C-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/7/7c/SaggitheDarkClown-DPKB-EN-C-UE.png */
    attributes: {
      Atack: 600,
      Defense: 1500,
      Level: 3,
    },
  },
  {
    name: "Blackland Fire Dragon",
    image: "imgs/BlacklandFireDragon-AP05-EN-SP-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/0/0a/BlacklandFireDragon-AP05-EN-SP-UE.png */
    attributes: {
      Atack: 1500,
      Defense: 800,
      Level: 4,
    },
  },
  {
    name: "Mammoth Graveyard",
    image: "imgs/MammothGraveyard-YGLD-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/2/24/MammothGraveyard-YGLD-EN-C-1E.png */
    attributes: {
      Atack: 1200,
      Defense: 800,
      Level: 3,
    },
  },
  {
    name: "Koumori Dragon",
    image: "imgs/KoumoriDragon-SKE-EN-C-1E.jpg",
    /* https://static.wikia.nocookie.net/yugioh/images/5/55/KoumoriDragon-SKE-EN-C-1E.jpg */
    attributes: {
      Atack: 1500,
      Defense: 1200,
      Level: 4,
    },
  },
  {
    name: "Beaver Warrior",
    image: "imgs/BeaverWarrior-YGLD-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/1/1c/BeaverWarrior-YGLD-EN-C-1E.png */
    attributes: {
      Atack: 1200,
      Defense: 1500,
      Level: 4,
    },
  },
  {
    name: "Hitotsu-Me Giant",
    image: "imgs/HitotsuMeGiant-DPKB-EN-C-1E.png",
    /* https://static.wikia.nocookie.net/yugioh/images/e/e5/HitotsuMeGiant-DPKB-EN-C-1E.png */
    attributes: {
      Atack: 1200,
      Defense: 1000,
      Level: 4,
    },
  },
  {
    name: "Bickuribox",
    image: "imgs/Bickuribox-PMT-PT-C-1E.jpg",
    /* https://static.wikia.nocookie.net/yugioh/images/7/7b/Bickuribox-PMT-PT-C-1E.jpg */
    attributes: {
      Atack: 2300,
      Defense: 2000,
      Level: 7,
    },
  },
  {
    name: "Ryu-Ran",
    image: "imgs/RyuRan-SRL-NA-C-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/4/46/RyuRan-SRL-NA-C-UE.png */
    attributes: {
      Atack: 2200,
      Defense: 2600,
      Level: 7,
    },
  },
  {
    name: "Thousand-Eyes Idol",
    image: "imgs/ThousandEyesIdol-RP02-EN-C-UE.png",
    /* https://static.wikia.nocookie.net/yugioh/images/4/41/ThousandEyesIdol-RP02-EN-C-UE.png */
    attributes: {
      Atack: 0,
      Defense: 0,
      Level: 1,
    },
  },
];
