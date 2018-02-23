# NutritionTracker

Done List:
- search food db
- add new food
- add food entry for a day
- navigate through entries daily
- edit / delete entry
- undo delete entry
- display progress against targets (currently static targets)
- add accounts
    -- phase 1 : in memory user store, login/logout
    -- phase 2 : db auth, add user for entries, show only my entries

- fix backend tests in cmd
- centralize auth header in service calls
- registration & db user store (save hashed passwords)
- add user macros targets

- Todo List:
    - integrate with USDA food API: key - oiz3RqxWkZAuaEVlGzqT9tDypJGoX0mecZ003TKC
      https://ndb.nal.usda.gov/ndb/doc/apilist/API-SEARCH.md
    - edit my foods
    - upgrade to angular 5


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Running on prod:
ng build --env=prod
then
npm run deploy
then try http://<hostip>:8008/

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


references used during this project dev:
http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial

problems I faced while deploying on EC2
1- I had npm packages installed globally on my dev machine that are not in package.json
2- windows is not case sensitive some file names in the imports mismatched the file name so they failed to import
3- moved the url of the backend to be environment based
4- had to export spring active profiles for backend and configured the client origin in the live profile properties.