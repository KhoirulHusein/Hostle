class contentSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }
 
  render() { 
    this.innerHTML = `
    <h1 id="hoverNowPlaying">Now Playings</h1>
    <div id="carouselPoster" class="carousel">
      <!-- ISI DATA DARI API -->
    </div>

    <div id="hoverPopulars" class="card-custom">
      <h1>Popular Movies</h1>
      <div id="listPopular" class="row row-cols-1 row-cols-md-4 g-4 my-2">
        <!-- ISI DATA DARI API -->
      </div>
      <button id="morePopularMoviesButton" class="button mt-2">More Movies</button>
    </div>

    <div id="hoverTopRated" class="card-custom">
      <h1>Top Rated</h1>
      <div id="listTopRated" class="row row-cols-1 row-cols-md-4 g-4 my-2">
        <!-- ISI DATA DARI API -->
      </div>
      <button id="moreRatedMoviesButton" class="button mt-2">More Movies</button>  
    </div>

    <div id="hoverUpcoming" class="card-custom">
      <h1>Upcoming</h1>
      <div id="listUpcoming" class="row row-cols-1 row-cols-md-4 g-4 my-2">
        <!-- ISI DATA DARI API -->
      </div>
      <button id="moreUpcomingMoviesButton" class="button mt-2">More Movies</button>  
    </div>
    `;
  }
}

customElements.define('content-section', contentSection);