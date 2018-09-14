# JotPad

## Description

React notepad app built with React and Firebase. A user will be able to sign up with an e-mail, username, and password. If they have an account and cannot remember their password, they will be able to send an e-mail to have it reset. When they log in, if they are on the desktop, they will be able to see their notes on the left of the page. On mobile, the list of notes will appear from the burger dropdown. The links in the header will be to go to the account page, and to sign out. On the account page, they will be able to change their password. When they will open a note, it will populate on the main part of the screen.

Firebase was used for authentication, as the database, and to deploy. 

Application is deployed on Firebase here: https://jot-pad-notes.firebaseapp.com/.

## Getting Started

* Fork and clone
* Create a Firebase account
  * Create a new project
* NPM install
* NPM run build
* NPM install -g firebase-tools
* Firebase init
  * Choose database and hosting
  * Choose your project
  * Keep default DB rules
  * Configure as single page app
  * Choose the deploy folder: in this case build
  * Do not overwrite the build/index.js
* Firebase deploy

## Built With

* [Firebase](https://firebase.google.com/)
* [Bootstrap](https://getbootstrap.com/)
* [React](https://reactjs.org/)

## Written By

* **Dave Schuetz** [GitHub](https://github.com/DaveSchuetz/)