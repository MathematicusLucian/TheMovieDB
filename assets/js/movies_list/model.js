export default class Model {
    constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.API_KEY = `api_key=99c7b3d80778633f81fca8eb499a0189`;
    this.MOVIEDB_API_URL = `${this.BASE_URL}/search/movie?${this.API_KEY}&language=en-US&page=1`; // last 3 months
    this.MOVIEDB_API_NEW = `${this.BASE_URL}/movie/new?${this.API_KEY}&language=en-US&page=1`;
    this.moviesList = [];
    this.searchValue = '';
    this.sortByValue = '';
    this.filterByValue = '';
  }

  /* Bindings */

  bindMoviesListChanged(callback) {
    this.moviesListChangedOnBind = callback;
  }
    
  /* Getters & Setters */

  getApiUrl = searchFieldValue => {
    let url;

    if (searchFieldValue !== '') {
      url = `${this.MOVIEDB_API_URL}&query=${searchFieldValue}`
    }
    else if (searchFieldValue === 'new') {
      url = `${this.MOVIEDB_API_NEW}`
    }

    return url;
  }

  /* Search Field */

  sortMoviesListBy(sortBy) {
    this.moviesList.sort((a, b) => b[sortBy] - a[sortBy]);
    this.moviesListChangedOnBind(this.moviesList);
  }

  /* API Call */

  fetchMoviesList(url) {
    fetch(url)
      .then((response) => response.json())
      .then(data => {
        this.moviesList = data.results;
        this.moviesListChangedOnBind(data);

        // filter to show only favourites if the user selects such a filter
        if (this.filterByValue === 'fav') {
          const localFavouriteMovies = JSON.parse(localStorage['fav-movies-list']);
          this.moviesList = this.moviesList.filter(movie => localFavouriteMovies.includes(movie.id));
          this.moviesListChangedOnBind(this.moviesList);
        }
    
        // sort moviesList as per sort dropdown
        if (this.sortByValue === 'highest') {
          this.sortMoviesListBy('vote_count');
        } else {
          this.sortMoviesListBy('id');
        }
      })
      // catch - 3 hour constraint, otherwise
  }

  /* Update Movies List */ 

  updateSearchValue(searchField) {
    this.searchValue = searchField;
    this.updateMoviesList();
  }

  updateSortByValue(sortByValue) {
    this.sortByValue = sortByValue;
    this.updateMoviesList();
  }

  updateFilterByValue(filterByValue, searchField) {
    this.filterByValue = filterByValue;
    this.searchField = searchField;
    this.updateMoviesList();
  }

  updateMoviesList(){
    // get moviesList to match filter dropdown
    if (this.filterByValue === 'new') {
      const url = this.getApiUrl('new');
      this.fetchMoviesList(url);
    }
    else {
      const url = this.getApiUrl(this.searchValue);
      this.fetchMoviesList(url);
    }
  }
}