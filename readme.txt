This is David Champions submission for the Easygo QE Technical Interview

I used the Contact List App. It has a UI and API and I wrote tests for both
https://thinking-tester-contact-list.herokuapp.com/

The lib folder has helper methods for contacts and users
the pages folder has the page selectors and methods to use on the pages. A few methods are unused
the tests are in the tests folder. One file for UI and one for API
the test.env file is so I could get dotenv to share the auth token between requests

I used faker.js to help generate some data for the tests.

A new user is created for every test as I wasnt sure if the website owners would wipe the database.

to install just clone and run npm install

to run tests with UI run npx playwright test --ui
and run px playwright test for no UI