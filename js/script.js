// This variable - global.currentPage - helps to id the current page
const global = {
  currentPage: window.location.pathname
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


// Init app - runs on every [current] page
// This function serves as a router
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      break;
    case '/shows.html':
      console.log('Shows');
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
