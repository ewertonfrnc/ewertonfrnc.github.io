'use strict';

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=668940c24e71a92c3796c7be4074cf25&language=pt-BR';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=668940c24e71a92c3796c7be4074cf25&language=pt-BR&query="';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

/////////////////////////////////////////////////////
const form = document.querySelector('.form');
const search = document.querySelector('.search');

const main = document.querySelector('.main');
/////////////////////////////////////////////////////

const showMovies = function (movies) {
  main.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = `
    <div class="movie">
    <img
    src="${IMG_PATH + poster_path} "
    alt="Movie"
    />

<div class="movie-info">
    <h3 class="movie-title">${title} </h3>
    <span class="${getClassByRate(vote_average)} ">${vote_average} </span>
</div>

<div class="overview">
    <h3>Sinopse</h3>
    <p>
        ${overview}
    </p>
</div>
</div>
    `;
    main.insertAdjacentHTML('afterbegin', movieEl);
  });
};

const getClassByRate = function (vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  if (vote < 5) return 'red';
};

const getMovie = async function (url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
  console.log(data.results);
};
getMovie(API_URL);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    getMovie(SEARCH_API + searchTerm);
    search.value = '';
  } else window.location.reload();
});
