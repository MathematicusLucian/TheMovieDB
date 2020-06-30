# TheMovieDB

- For the API: http://developers.themoviedb.org/3/

## Running the app

- Before running the app, install node, and run `npm install`. The enviroment requires node and http-server (https://www.npmjs.com/package/http-server).
- Run the application: `npm run server`
- Unit testing: `npm run test`

## Notes

-	Filters: "new" being those released in the last 3 months and therefore not "upcoming".
-	Favourites only shows "liked" movies that match the search criteria.
-	Basic MVC design pattern. Frameworks, and modules such as Webpack, are not permitted.
-	I am very passionate about unit testing, writing them before implementing code (and certainly before refactoring, TDD) but in the given 3 hour limit, it is impossible to write all the code required and also the tests.
-	App utilises CSS, though SASS would be worth considering. The application is not fully responsive due to time constraints.
-	With more time, documentation could be more verbose.