import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Note from './Note'
import Notes from './Notes'
import * as routes from '../constants/routes'
import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import AccountPage from './Account';
import { fire } from '../firebase';

import withAuthentication from './withAuthentication';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    fire.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser: authUser.uid })
        : this.setState({ authUser: null });
    });
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1 className="title">Jotpad</h1>
          <Navigation />
        </header>
        
        <main>
        <Notes authUser={this.state.authUser} />
          <Switch>
            <Route exact path='/notes/:id' component={Note} />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withAuthentication(App);
