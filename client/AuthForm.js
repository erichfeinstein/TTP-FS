/* eslint-disable react/button-has-type */
/* eslint-disable complexity */
import React from 'react';
import axios from 'axios';

export default class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordReEnter: '',
      userAlreadyExistsError: false,
      badCredentialsError: false,
    };
  }

  render() {
    const { isLogin } = this.props;
    const passwordsMatch =
      this.state.password === this.state.passwordReEnter && !isLogin;
    return (
      <div id="auth-form">
        <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
        <br />
        <div>
          <div>Email</div>
          <br />
          <input
            className="form-field"
            type="text"
            value={this.state.email}
            onChange={evt =>
              this.setState({
                email: evt.target.value,
                userAlreadyExistsError: false,
                badCredentialsError: false,
              })
            }
          />
          {this.state.userAlreadyExistsError && (
            <div>
              <br />
              <div className="error">
                Error! User with this email already exists!
              </div>
            </div>
          )}
        </div>
        <br />
        <div>
          <div>Password</div>
          <br />
          <input
            className="form-field"
            type="password"
            onChange={evt =>
              this.setState({
                password: evt.target.value,
                badCredentialsError: false,
              })
            }
          />
        </div>
        <br />
        {isLogin ? null : (
          <div>
            <div>Re-Enter Password</div>
            {!passwordsMatch &&
              this.state.password.length >= 1 &&
              this.state.passwordReEnter >= 1 && (
                <div>
                  <br />
                  <div className="error">Passwords must match!</div>
                </div>
              )}
            <br />
            <input
              className="form-field"
              type="password"
              onChange={evt =>
                this.setState({
                  passwordReEnter: evt.target.value,
                })
              }
            />
          </div>
        )}
        {this.state.badCredentialsError && (
          <div>
            <br />
            <div className="error">Invalid email or password!</div>
          </div>
        )}
        <br />
        <button
          disabled={!passwordsMatch && !isLogin}
          className="button"
          // onKeyDown=
          onClick={
            isLogin
              ? () => this.login(this.state.email, this.state.password)
              : () => this.signup(this.state.email, this.state.password)
          }
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    );
  }
  login = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      this.props.setUser(data);
      this.props.history.push('/portfolio');
    } catch (error) {
      if (error.response && error.response.status === 401)
        this.setState({
          badCredentialsError: true,
        });
      console.error(error);
    }
  };
  signup = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/signup', {
        email,
        password,
      });

      this.props.setUser(data);
      this.props.history.push('/portfolio');
    } catch (error) {
      if (error.response && error.response.status === 409)
        this.setState({
          userAlreadyExistsError: true,
        });
    }
  };
}
