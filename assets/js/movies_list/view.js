export default class View {
    constructor() {
        this.BASE_URL = 'http://image.tmdb.org/t/p/w92//';
        this.searchButton = document.getElementById("search_button");
        this.searchField = document.getElementById("search_field");
        this.moviesListType = document.getElementById("movies_list_type");
        this.moviesCount = document.getElementById("movies_count");
        this.resultsList = document.getElementById("movies_list");
        this.sortMoviesListBy = document.getElementById("sort_movieslist_by_vote");
        this.filterMoviesListBy = document.getElementById("filter_movieslist_by");
        this.favouriteMovies = [];
    }

    /* Bindings */ 
  
    bindSubmit = handler =>
        this.searchButton.addEventListener('click', e => handler(e)); 
    
    bindOnSortDropdown = handler =>
        this.sortMoviesListBy.addEventListener('change', e => handler(e));
    
    bindOnFilterDropdown = handler =>
        this.filterMoviesListBy.addEventListener('change', e => handler(e));

    bindSetFavouriteMovie = () => {
        let { favouriteMovies, resultsList, updateLocalStorage } = this
    
        resultsList.addEventListener('click', e => {
    
        console.log(e.target.dataset.id);
    
        if (e.target && e.target.className.includes('fav_icon')) {
    
            const id = parseInt(e.target.dataset.id);
            const isFavMovie = favouriteMovies.includes(id); 
    
            console.log('id ', id);
    
            if (!isFavMovie) {
    
            // add favourite to list
            favouriteMovies.push(parseInt(id));
            // update local storage
            updateLocalStorage(favouriteMovies);
            // set heart image as favourite (green outline)
            e.target.className = 'fav_icon active';
    
            } else {
    
            // remove favourite from list
            favouriteMovies = favouriteMovies.filter(movieId => movieId !== id);
    
            // update local storage
            updateLocalStorage(favouriteMovies);
            // set heart image as not favourite (no green outline)
            e.target.className = 'fav_icon';
    
            }
        }
        })
    }

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

    updateMoviesListTypeHeader() {
        var heading = this.filterMoviesListBy.selectedOptions[0].label;
        this.moviesListType.innerHTML = `<h3>${heading}</h3>`;
    }

    renderResults(results) {
        this.moviesCount.innerHTML = `<h4>Showing ${results.length} movies</h4>`;
        this.resultsList.innerHTML = results.map(movie => this.setMovieHTML(movie));
    }

    updateLocalStorage = movies =>
        localStorage.setItem('fav-movies-list', JSON.stringify(movies));
}