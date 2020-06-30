'use strict';

var chai = require('chai');
var assert = chai.assert;

const fs = require('fs'); 

import Model from '../assets/js/movies_list/model.js'

describe('Model', function () {
  const model = new Model();
  const API_KEY = `api_key=99c7b3d80778633f81fca8eb499a0189`;

  describe('sortMoviesListBy', () => {
    it('should be in order by votes', function () {

    let rawdata = fs.readFileSync('sampleData.json');
    let sampleData = JSON.parse(rawdata);

    const expected = "185";    
    
    model.sortMoviesListBy(sampleData);

    const actual = model.moviesList[0].id;

    assert.equal(actual, expected);
    });
  });
  

});