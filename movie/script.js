'use strict';

// const API_URL =
//   'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=668940c24e71a92c3796c7be4074cf25&language=pt-BR';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=668940c24e71a92c3796c7be4074cf25&language=pt-br';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=668940c24e71a92c3796c7be4074cf25&language=pt-BR&query=';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

/////////////////////////////////////////////////////
const filmesContainer = document.querySelector('.filmes');
const form = document.querySelector('.form');
const pesquisar = document.querySelector('.form__input');
/////////////////////////////////////////////////////

const geraMarcacao = function (filmes) {
  filmesContainer.innerHTML = '';

  filmes.forEach(filme => {
    const { title, overview, poster_path, release_date } = filme;

    const marcacao = `
    <div class="filme">
      <img
        src="${IMG_PATH}${poster_path}"
        alt="${title}"
        class="filme__img"
      />

      <div class="filme__info">
        <h2 class="filme__info--titulo">${title}</h2>
        <p class="filme__info--ano">${release_date}</p>
      </div>
      <div class="filme__sinopse">
        <h3>Sinopse</h3>
        <p>
        ${overview}
        </p>
      </div>
    </div> 
  `;

    filmesContainer.insertAdjacentHTML('beforeend', marcacao);
  });
};

const pesquisaDeFilmes = function (e) {
  e.preventDefault();

  const pesquisa = pesquisar.value;

  if (pesquisa && pesquisa !== '') {
    pegaListaDeFilmes(SEARCH_API + pesquisa);

    pesquisar.value = '';
  } else window.location.reload();
};

form.addEventListener('submit', pesquisaDeFilmes);

const pegaListaDeFilmes = async function (url) {
  const requerimento = await fetch(url);
  const resultados = await requerimento.json();
  console.log(resultados.results)
  geraMarcacao(resultados.results);
};
pegaListaDeFilmes(API_URL);
