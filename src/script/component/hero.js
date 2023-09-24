class hero extends HTMLElement {
  connectedCallback() {
    this.render();
  }
 
  render() { 
    this.innerHTML = `
    <article class="wrapper-outer">
        <div id="upperSection" class="row align-items-center">
          <!-- ISI DATA DARI API -->
        </div>
      </article>
      `;
  }
}

customElements.define('hero-section', hero);