/* eslint-disable complexity */
import React from 'react';
import axios from 'axios';

export default class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      email: '',
      password: '',
      passwordReEnter: '',
    };
  }
  render() {
    const passwordsMatch =
      this.state.password === this.state.passwordReEnter && !this.state.isLogin;
    return (
      <div id="auth-form">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{this.state.isLogin ? 'Log In' : 'Sign Up'}</h2>
          <button
            onClick={() =>
              this.setState({
                isLogin: !this.state.isLogin,
              })
            }
            className="button"
          >
            Switch to {this.state.isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        <br />
        <div>
          <div>Email</div>
          <br />
          <input
            className="auth-form-field"
            type="text"
            value={this.state.email}
            onChange={evt =>
              this.setState({
                email: evt.target.value,
              })
            }
          />
        </div>
        <br />
        <div>
          <div>Password</div>
          <br />
          <input
            className="auth-form-field"
            type="password"
            onChange={evt =>
              this.setState({
                password: evt.target.value,
              })
            }
          />
        </div>
        <br />
        {this.state.isLogin ? null : (
          <div>
            <div>Re-Enter Password</div>
            {!passwordsMatch &&
              this.state.password.length >= 1 &&
              this.state.passwordReEnter >= 1 && (
                <div className="error">Passwords must match!</div>
              )}
            <br />
            <input
              className="auth-form-field"
              type="password"
              onChange={evt =>
                this.setState({
                  passwordReEnter: evt.target.value,
                })
              }
            />
          </div>
        )}
        <br />
        <button
          className="button"
          onClick={
            this.state.isLogin
              ? () => this.login(this.state.email, this.state.password)
              : () => this.signup(this.state.email, this.state.password)
          }
        >
          {this.state.isLogin ? 'Log In' : 'Sign Up'}
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  signup = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/signup', {
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
}
