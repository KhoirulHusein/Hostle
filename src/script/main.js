import '../style/style.css'
import axios from 'axios';

function main() {
  const baseUrl = 'https://api.themoviedb.org/3';
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2Q0MDlmZWExZWNiZTM0MGFiZTVkMDhjNTMyYmZlNyIsInN1YiI6IjY1MDQ0MDk3ZDdkY2QyMDBmZmVkYjMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Cj0XfZyDqKwAP4BCMgxD4U8YWfilgTJ2ASTtdW0TFG0';
  const imageUrl = 'https://image.tmdb.org/t/p/w500';

  const options = axios.create({
    baseURL: baseUrl,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const fetchDataFromApi = async (endpoint, callback) => {
    try {
      const response = await options.get(endpoint);
      const responseJson = response.data;

      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else if (responseJson.results) {
        callback(responseJson.results);
      } else {
        showResponseMessage('Respons API tidak valid');
      }
    } catch (error) {
      console.error('Ada kesalahan dalam permintaan Axios:', error);
      showResponseMessage('Gagal melakukan fetch data dari API');
    }
  };

  const getNowPlayingMovies = () => {
    const endpoint = '/movie/now_playing';
    fetchDataFromApi(endpoint, renderNowPlaying);
  };

  const getPopularMovies = () => {
    const endpoint = '/movie/popular';
    fetchDataFromApi(endpoint, renderPopularMovie);
  };

  const getRatedMovies = () => {
    const endpoint = '/movie/top_rated';
    fetchDataFromApi(endpoint, renderRatedMovie);
  };

  const getUpcomingMovies = () => {
    const endpoint = '/movie/upcoming';
    fetchDataFromApi(endpoint, renderUpcomingMovie);
  };
  
  const getSearchMovies = () => {
    const searchForm = document.getElementById('searchForm');
    const inputSearchBar = document.getElementById('inputSearchBar');
    const searchResult = document.getElementById('searchResult');
  
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = inputSearchBar.value.trim();
  
      if (query === '') {
        searchResult.innerHTML = '';
        return;
      }
  
      const endpoint = `/search/movie?query=${query}`;
      fetchDataFromApi(endpoint, (results) => {
        if (results.length === 0) {
          searchResult.innerHTML = '<p>No results found.</p>';
        } else {
          renderSearchResults(results);
        }
      });
    });
  };
  
  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  const renderNowPlaying = (movies) => {
    const carouselPoster = document.querySelector('#carouselPoster');
    const upperSection = document.querySelector('#upperSection');
    carouselPoster.innerHTML = '';
    upperSection.innerHTML = '';

    const movie = movies[12];

    const rating = Math.round(movie.vote_average / 2);
    let stars = '';
  
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '<i class="fa-solid fa-star fa-beat" style="color: #fffb00;"></i>';
      } else {
        stars += '<i class="fa-regular fa-star" style="color: #fffb00;"></i>';
      }
    } 

    upperSection.innerHTML = `
      <div class="col-md-5 mx-md-auto">
        <h4>${movie.title}</h4>
        <p id="custom-size" >${movie.overview}</p>
        <p>${stars}</p>
      </div>
      <div class="col-md-2 mx-md-auto poster">
        <a href="#"><img src="${imageUrl}/${movie.poster_path}" alt="${movie.title}"></a>
      </div>
    `;
    
    const linearGradient = 'linear-gradient(rgba(0, 0, 0, 0.308), rgba(0,0,0,0.308)), ';
    const backgroundImage = `url(${imageUrl}/${movie.backdrop_path})`;
    document.querySelector('.wrapper-outer').style.backgroundImage = linearGradient + backgroundImage;

    movies.forEach(movie => {
      carouselPoster.innerHTML += `
      <div class="carousel-slide">
        <img src="${imageUrl}/${movie.poster_path}" alt="${movie.title}">
      </div>
    `})
  };

  const renderMovieList = (movies, listElementId, buttonElementId) => {
    const listMovieElement = document.querySelector(listElementId);
    const moreMoviesButton = document.querySelector(buttonElementId);
    let displayedMoviesCount = 8;
  
    const moreMovies = () => {
      const moviesToDisplay = movies.slice(0, displayedMoviesCount);
  
      listMovieElement.innerHTML = '';
      moviesToDisplay.forEach(movie => {
        const rating = Math.round(movie.vote_average / 2);
        let stars = '';
  
        for (let i = 0; i < 5; i++) {
          if (i < rating) {
            stars += '<i class="fa-solid fa-star fa-beat" style="color: #fffb00;"></i>';
          } else {
            stars += '<i class="fa-regular fa-star" style="color: #fffb00;"></i>';
          }
        }
  
        listMovieElement.innerHTML += `
          <div class="col">
            <div class="card h-100">
              <img src="${imageUrl}/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
              <div class="card-body card-img-overlay">
                <span class="badge badge-warning rating-badge">${stars}</span>
                <h5 class="card-title">${movie.original_title}</h5>
                <p id="custom-size" class="card-text";">${movie.overview}</p>
              </div>
            </div>
          </div>
        `;
      });
  
      displayedMoviesCount += 8;
    };
  
    moreMovies();
    moreMoviesButton.addEventListener('click', moreMovies);
  };

  const renderSearchResults = (results) => {
    const searchResult = document.querySelector('#searchResult');
    searchResult.innerHTML = ''; 

    const main = document.querySelector('main');
    main.innerHTML = '';

    results.forEach((movie) => {
      const rating = Math.round(movie.vote_average / 2);
      let stars = '';
  
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          stars += '<i class="fa-solid fa-star fa-beat" style="color: #fffb00;"></i>';
        } else {
          stars += '<i class="fa-regular fa-star" style="color: #fffb00;"></i>';
        }
      }
  
      searchResult.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${imageUrl}/${movie.poster_path}" alt="${movie.title}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p id="custom-size" class="card-text">${movie.overview}</p>
            <p class="card-text"><small class="text-muted">${stars}</small></p>
          </div>
        </div>
      </div>
      `;
    });
  };
  
  const renderPopularMovie = async (movies) => {
    renderMovieList(movies, '#listPopular', '#morePopularMoviesButton');
  };
  
  const renderRatedMovie = async (movies) => {
    renderMovieList(movies, '#listTopRated', '#moreRatedMoviesButton');
  };

  const renderUpcomingMovie = async (movies) => {
    renderMovieList(movies, '#listUpcoming', '#moreUpcomingMoviesButton')
  };

  document.addEventListener('DOMContentLoaded', () => {
    getNowPlayingMovies();
    getPopularMovies();
    getRatedMovies();
    getUpcomingMovies();
    getSearchMovies();
  });
}

export default main;