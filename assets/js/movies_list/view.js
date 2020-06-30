export default class View {
    constructor() {
        this.BASE_URL = 'http://image.tmdb.org/t/p/w92//';
        this.searchButton = document.getElementById("search_button");
        this.searchField = document.getElementById("search_field");
    }

    /* Bindings */ 
  
    bindSubmit = handler =>
      this.searchButton.addEventListener('click', e => handler(e));
}