'use strict';

/////////////////////////////////////
// SLIDER
const slides = document.querySelectorAll('.slide');

let slideAtual = 0;
let quantSlides = slides.length;

const moveSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const avancaSlide = function () {
  if (slideAtual === quantSlides - 1) slideAtual = 0;
  else slideAtual++;

  moveSlide(slideAtual);
};

setInterval(avancaSlide, 3000);
