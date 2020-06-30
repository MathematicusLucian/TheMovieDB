import Model from './movies_list/model.js';
import View from './movies_list/view.js';

class Controller {
  constructor(model, view) {
    this.moviesListModel = model
    this.moviesListView = view

    // Bindings

  }

  // Handlers 


}

const App = new Controller(new Model(), new View())