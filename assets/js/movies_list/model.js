export default class Model {
    constructor() {
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.API_KEY = `api_key=99c7b3d80778633f81fca8eb499a0189`;
    this.MOVIEDB_API_URL = `${this.BASE_URL}/search/movie?${this.API_KEY}&language=en-US&page=1`; 

    // ideally would implement state management for the following variables
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
    return url;
  }

  getReleaseData(movie) {
    const { release_date } = movie;
    return release_date
  }

  /* Search Field */

  sortMoviesListBy(sortBy) {
    this.moviesList.sort((a, b) => b[sortBy] - a[sortBy]);
  }

  /* API Call */

  fetchMoviesList(url) {
    fetch(url)
      .then((response) => response.json())
      .then(data => {
        this.moviesList = data.results;
        this.moviesListChangedOnBind(data);

        // "new" being those released in the last 3 months and therefore not "upcoming"
        if (this.filterByValue === 'new') {

          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          // filter out anything before 3 months ago
          this.moviesList = this.moviesList.filter(movie => new Date(this.getReleaseData(movie)) >= threeMonthsAgo);

        } else if (this.filterByValue === 'fav') {
          
          const localFavouriteMovies = JSON.parse(localStorage['fav-movies-list']);
          // filter out anything not in the favourites local storage
          this.moviesList = this.moviesList.filter(movie => localFavouriteMovies.includes(movie.id)); 
        
        }
    
        // sort moviesList as per sort dropdown
        if (this.sortByValue === 'highest') {
          this.sortMoviesListBy('vote_count');
        } else {
          this.sortMoviesListBy('id');
        }

        this.moviesListChangedOnBind(this.moviesList);
      })
      // catch - time constraint, otherwise
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
    const url = this.getApiUrl(this.searchValue);
    this.fetchMoviesList(url);
  }
}