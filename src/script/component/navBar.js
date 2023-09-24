import Gambar from '../../images/Logo.png';
class navBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() { 
    this.innerHTML = `
    <div class="container">
      <nav class="navbar">
        <a id="logoNavbar" href="index.html" class="navbar-brand">
          <img src="${Gambar}" alt="Hostle Logo">
        </a>
        <form class="d-flex" role="search" id="searchForm">
          <input id="inputSearchBar" class="form-control me-2" type="search" placeholder="Cari Movies Anda" aria-label="Search">
          <button id="buttonSearch" class="button" type="submit">Search</button>
        </form>
      </nav>
      <div id="searchResult" class="row row-cols-1 row-cols-sm-4 g-4 m-3">
        <!-- ISI DATA SEARCH DARI API -->
      </div>
    </div>`;
  }
}

customElements.define('nav-bar', navBar);