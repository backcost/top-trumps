let cartaPaulo = {
  name: "Shiryu de dragão",
  image: "http://pm1.narvii.com/6399/96fdb9d4fe6a9e72b9bc60ad418e3c43795e53b4_00.jpg",
  atributes: {
    ataque: 5,
    defesa: 9,
    magia: 10
  }
};

let cartaRafa = {
  name: "Bulbasauro",
  image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  atributes: {
    ataque: 7,
    defesa: 8,
    magia: 6
  }
};

let cartaGui = {
  name: "Darth Vader",
  image:
    "https://images-na.ssl-images-amazon.com/images/I/41i-0NH0q9L._SX328_BO1,204,203,200_.jpg",
  atributes: {
    ataque: 9,
    defesa: 8,
    magia: 2
  }
};

let cartaMaquina;
let cartaJogador;
let cartas = [cartaPaulo, cartaRafa, cartaGui];
// 0          1           2

function sortearCarta() {
  let numeroCartaMaquina = parseInt(Math.random() * 3);
  cartaMaquina = cartas[numeroCartaMaquina];

  let numeroCartaJogador = parseInt(Math.random() * 3);
  while (numeroCartaJogador == numeroCartaMaquina) {
    numeroCartaJogador = parseInt(Math.random() * 3);
  }
  cartaJogador = cartas[numeroCartaJogador];
  console.log(cartaJogador);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  exibirCartaJogador();
}

function obtematributeselecionado() {
  let radioAtributo = document.getElementsByName("atributo");
  for (let i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value;
    }
  }
}

function jogar() {
  console.log("chamou");
  let atributeselecionado = obtematributeselecionado();
  let divResultado = document.getElementById("resultado");

  if (
    cartaJogador.atributes[atributeselecionado] >
    cartaMaquina.atributes[atributeselecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Venceu</p>";
  } else if (
    cartaJogador.atributes[atributeselecionado] <
    cartaMaquina.atributes[atributeselecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Perdeu</p>";
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou</p>";
  }
  divResultado.innerHTML = htmlResultado;

  document.getElementById("btnJogar").disabled = true;
  exibirCartaMaquina();
}

function exibirCartaJogador() {
  let divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.image})`;
  let moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  let tagHTML = "<div id='opcoes' class='carta-status'>";

  let opcoesTexto = "";
  for (let atributo in cartaJogador.atributes) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributes[atributo] +
      "<br>";
  }
  let name = `<p class="carta-subtitle">${cartaJogador.name}</p>`;

  divCartaJogador.innerHTML = moldura + name + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  let divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.image})`;
  let moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  let tagHTML = "<div id='opcoes' class='carta-status'>";

  let opcoesTexto = "";
  for (let atributo in cartaMaquina.atributes) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributes[atributo] +
      "</p>";
  }
  let name = `<p class="carta-subtitle">${cartaMaquina.name}</p>`;

  divCartaMaquina.innerHTML = moldura + name + tagHTML + opcoesTexto + "</div>";
}


/*   Verificar o que acontece caso você não selecione nenhum dos 
atributes e como solucionar

Adicionar a image do personagem assim que você selecionar a carta 
dele 

Criar de fato um baralho, com várias outras cartas

Desenvolver um sistema em que a cada carta que um jogador ganhe, 
ele fique com a carta do oponente e vice versa

Transformar as funções exibirCartaMaquina() e exibirCartaJogador() 
em apenas uma, chamada exibirCarta(), utilizando para isso a 
passagem de parâmetros

Utilizar seus personagens e jogos preferidos nesse projeto
*/