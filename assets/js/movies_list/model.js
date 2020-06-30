export default class Model {
    constructor() {
    }

    /* API Call */
  
    fetchMoviesList(url) {
      fetch(url)
        .then((response) => response.json())
        .then(data => {
          this.moviesList = data.results;
          this.moviesListChangedOnBind(data);
  
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
}