"use strict";

const form = document.querySelector(".form");
const containerViagens = document.querySelector(".viagens");
const inputDestino = document.querySelector(".form__input--destino");
const inputDias = document.querySelector(".form__input--semanas");
const inputPessoas = document.querySelector(".form__input--pessoas");
const inputHotelaria = document.querySelector(".form__input--hotelaria");
const inputGastos = document.querySelector(".form__input--gastos");

const gastosIndividuais = document.querySelector(".resultados__valor");

const btn = document.querySelector(".btn");

class Viagem {
  constructor(destino, dias, pessoas, hotelaria, gastos) {
    this.destino = destino;
    this.dias = dias; // em dias
    this.pessoas = pessoas;
    this.hotelaria = hotelaria;
    this.gastos = gastos;
  }
}

class App {
  #contador = 0; // Usado na função _calcularmédia()
  #viagens = [];
  #gastos = [];

  constructor() {
    form.addEventListener("submit", this._novaViagem.bind(this));
    btn.addEventListener("click", this._calcularMedia.bind(this));

    inputDestino.focus();
  }

  // Aqui ficam os métodos principais
  _novaViagem(e) {
    e.preventDefault();

    // Pegar dados do form
    const destino = inputDestino.value;
    const dias = +inputDias.value;
    const pessoas = +inputPessoas.value;
    const hotelaria = +inputHotelaria.value;
    const gastos = +inputGastos.value;
    let viagem;

    // Adiciona a nova viagem na lista de viagens
    viagem = new Viagem(destino, dias, pessoas, hotelaria, gastos);
    this.#viagens.push(viagem);
    this.#gastos.push(viagem.gastos);
    console.log(viagem);

    // Colocar viagem na lista
    this._insereViagem(viagem);

    // Limpar os inputs
    inputDestino.value =
      inputDias.value =
      inputPessoas.value =
      inputHotelaria.value =
      inputGastos.value =
        "";
  }

  _calcularMedia() {
    // Soma todos os valores gastos de cada viagem
    const somaDosGastos = this.#viagens.reduce(
      (soma, viagemAtual) => soma + (viagemAtual.gastos / viagemAtual.dias) * 7,
      0
    );

    const media = somaDosGastos / this.#viagens.length;
    const html = `
      <p>R$ ${media.toFixed(2)}
    `;

    gastosIndividuais.insertAdjacentHTML("beforeend", html);
  }

  _insereViagem(viagem) {
    const html = `
      <li class="viagem">
      <h2 class="viagem__titulo">
        Viagem para ${viagem.destino} - R$ ${viagem.gastos.toFixed(2)}
      </h2>

      <div class="viagem__detalhes">
        <span class="viagem__icone">📅</span>
        <span class="viagem__valor">${viagem.dias}</span>
        <span class="viagem__unidade">dias</span>
      </div>
      <div class="viagem__detalhes">
        <span class="viagem__icone">👫</span>
        <span class="viagem__valor">${viagem.pessoas}</span>
        <span class="viagem__unidade">pessoas</span>
      </div>
      <div class="viagem__detalhes">
        <span class="viagem__icone">⭐</span>
        <span class="viagem__valor">${viagem.hotelaria}</span>
        <span class="viagem__unidade">estrelas</span>
      </div>
    </li>
      `;

    form.insertAdjacentHTML("afterend", html);
  }
}

const app = new App();
