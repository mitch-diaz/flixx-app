// This variable - global.currentPage - helps to id the current page
const global = {
  currentPage: window.location.pathname
}

// Display 20 popular movies
async function displayPopularMovies() {
  const {results} = await fetchApiData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
      movie.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />` 
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
      document.querySelector('#popular-movies').appendChild(div);
  })
}

// Display popular TV shows
async function displayPopularTvShows() {
  const {results} = await fetchApiData('tv/popular');
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
      show.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />` 
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `;
      document.querySelector('#popular-shows').appendChild(div);
  })
}


// Fetch data from TMDB api
async function fetchApiData(endpoint) {
  // Please register at https://themoviedb.org to get your own key - it's free. 
  const API_KEY = '00e055a091233735d83a66f8bf60e7a2';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();

  hideSpinner();

  return data;
}

// Show spinner animation while fetch is working
function showSpinner() {
  document.querySelector('.spinner').classList.add('.show')
}
// Hide spinner when complete
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('.show')
}


// Highlight active link - classList.add active #f1c40f
function activeLinkTextColor() {
  const links = document.querySelectorAll('.nav-link')

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  })

}


// Init app - connected to and runs on every page
// This function serves as a router
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTvShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  activeLinkTextColor();
}


document.addEventListener('DOMContentLoaded', init);
