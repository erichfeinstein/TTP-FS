import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

//Util
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

//Components
import Transactions from './Transactions';
import Portfolio from './Portfolio';
import AuthForm from './AuthForm';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    //Attempt to find user
    const { data } = await axios.get('/auth/me');
    if (data) {
      history.push('/transactions');
      this.setState({ user: data });
    }
  }

  render() {
    return (
      <Router history={history}>
        <div id="nav-bar">
          <div>
            <span>{this.state.user && this.state.user.email}</span>
          </div>
          <div>
            <Link to="/portfolio">Portfolio</Link>
          </div>
          <div>
            <Link to="/transactions/">Transactions</Link>
          </div>
          <div>
            <Link to="/signup/">Sign Up</Link>
          </div>
          <div>
            <Link to="/login/">Log In</Link>
          </div>
        </div>
        <br />
        <div id="main">
          <h1 id="title">Stonks</h1>
          <hr />
          <Switch>
            <Route
              exact
              path="/login"
              component={() => <AuthForm isLogin={true} />}
            />
            <Route
              exact
              path="/signup"
              component={() => <AuthForm isLogin={false} />}
            />
            <Route
              path="/portfolio"
              component={() => (
                <Portfolio userId={this.state.user && this.state.user.id} />
              )}
            />
            <Route
              exact
              path="/transactions"
              component={() => (
                <Transactions userId={this.state.user && this.state.user.id} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
