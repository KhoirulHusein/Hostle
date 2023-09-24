class tabsNav extends HTMLElement {
  connectedCallback() {
    this.render();
  }
 
  render() { 
    this.innerHTML = `
    <ul class="nav bg-dark justify-content-center sticky-top my-5">
      <li class="nav-item">
        <a class="nav-link" href="#hoverNowPlaying">Now Playing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#hoverPopulars">Popular</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#hoverTopRated">Top Rated</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#hoverUpcoming">Upcoming</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#backToTop">Back To Top</a>
      </li>
    </ul>
    `;
  }
}

customElements.define('tabs-nav', tabsNav);