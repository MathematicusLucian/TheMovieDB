export default class View {
    constructor() {
        this.BASE_URL = 'http://image.tmdb.org/t/p/w92//';
        this.searchButton = document.getElementById("search_button");
        this.searchField = document.getElementById("search_field");
        this.moviesCount = document.getElementById("movies_count");
        this.resultsList = document.getElementById("movies_list")
    }

    /* Bindings */ 
  
    bindSubmit = handler =>
        this.searchButton.addEventListener('click', e => handler(e));

    /* Getters and Setters */
    
    setMovieHTML(movie) {
        const { id, overview, release_date, title } = movie
    
        const DESC_LENGTH = 460;
    
        const favouriteMovies = JSON.parse(localStorage['fav-movies-list']);
        const isFavMovie = favouriteMovies.includes(id);
        const movieDate = release_date.substring(0, 4);
        const moviePosterPath = `${this.BASE_URL}${movie.poster_path}`;
    
        const movieDescription =
            overview.length > DESC_LENGTH
            ? `${overview.substring(0, DESC_LENGTH)}${' ...'}`
            : overview;
    
        const favIcon = isFavMovie 
            ? 'fav_icon active'
            : 'fav_icon';
    
        // prepared HTML
        return `
            <li>
            <img src=${moviePosterPath} />
            <div class="left_box">
                <h3>
                ${title} 
                <span>(${movieDate})</span>
                </h3>
                <span class="description">${movieDescription}</span>
            </div>
            <div class="right_box">
                <span class="${favIcon}" data-id="${id}" /></span>
                <button>More info</<button>
            </div>
            </li>
            `;
    }

    /* Utils */
    renderResults(results) {
        this.moviesCount.innerHTML = `<h4>Showing ${results.length} movies</h4>`;
        this.resultsList.innerHTML = results.map(movie => this.setMovieHTML(movie));
    }
}