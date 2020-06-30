import Model from './movies_list/model.js?v10';
import View from './movies_list/view.js?v11';

class Controller {
  constructor(model, view) {
    this.moviesListModel = model
    this.moviesListView = view

    // Bindings
    this.moviesListView.bindSubmit(this.handleSubmit);
    this.moviesListView.bindOnFilterDropdown(this.handleOnFilter);
    this.moviesListView.bindOnSortDropdown(this.handleBySortByVote);
    this.moviesListView.bindSetFavouriteMovie(this.moviesListModel.favouriteMovies);
    this.moviesListModel.bindMoviesListChanged(this.moviesListChangedOnBind);
  }

  // Handlers 

  handleSubmit = e => {
    const searchField = this.moviesListView.searchField.value;
    console.log('search field value: ', searchField);
    if(searchField !== '') {
      this.moviesListModel.updateSearchValue(searchField);
      this.moviesListView.updateMoviesListTypeHeader();
    } else {
      this.moviesListView.renderError();
    }
  }

  handleBySortByVote = e  => this.moviesListModel.updateSortByValue(e.target.value);

  handleOnFilter = e => {
    this.moviesListModel.updateFilterByValue(e.target.value, this.moviesListView.searchField);
    this.moviesListView.updateMoviesListTypeHeader();
  }

  // Changes On Binding
  moviesListChangedOnBind = () => this.moviesListView.renderResults(this.moviesListModel.moviesList);
}

const App = new Controller(new Model(), new View())