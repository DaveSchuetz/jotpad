import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h3 className="acct">SignIn</h3>
    <SignInForm history={history} />
    <div className="click"><PasswordForgetLink /></div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';
      
    return (
      <form onSubmit={this.onSubmit}>
        <input className="sign-in" value={email} onChange={event => this.setState(byPropKey('email', event.target.value))} type="text" placeholder="Email Address" />
        <input className="sign-in" value={password} onChange={event => this.setState(byPropKey('password', event.target.value))} type="password" placeholder="Password" />
        <button className="sign-in" disabled={isInvalid} type="submit">Sign In</button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};