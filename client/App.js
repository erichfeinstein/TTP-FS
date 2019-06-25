/* eslint-disable complexity */
import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

//Util
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

//Components
import Transactions from './Transactions';
import Portfolio from './Portfolio';
import AuthForm from './AuthForm';

//React-Modal
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLogoutModalOpen: false,
    };
    this.updateBalance = this.updateBalance.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({
      user,
    });
  }

  updateBalance(isDecrease, amount) {
    const newBalance = isDecrease
      ? this.state.user.balance - amount
      : this.state.user.balance + amount;

    const user = {
      id: this.state.user.id,
      email: this.state.user.email,
      balance: newBalance,
    };
    this.setState({
      user,
    });
  }

  async componentDidMount() {
    //Attempt to find user
    const { data } = await axios.get('/auth/me');
    if (data && data.id) {
      history.push('/portfolio');
      this.setState({ user: data });
    } else {
      this.setState({
        user: null,
      });
      history.push('/login');
    }
  }

  openModal = () => {
    this.setState({
      isLogoutModalOpen: true,
    });
  };
  closeModal = () => {
    this.setState({
      isLogoutModalOpen: false,
    });
  };
  logout = async () => {
    try {
      const { data } = await axios.post('/auth/logout');
      if (data) {
        this.setState({
          user: null,
          isLogoutModalOpen: false,
        });
        location.reload();
      }
    } catch (error) {
      console.error('Problem logging out');
    }
  };

  render() {
    const isLoggedIn = this.state.user && this.state.user.id;
    return (
      <Router history={history}>
        <div id="nav-bar">
          {isLoggedIn && (
            <div>
              <Link onClick={this.openModal}>Log Out</Link>
            </div>
          )}
          <Modal
            isOpen={this.state.isLogoutModalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}
          >
            <h2>Are you sure you want to log out?</h2>
            <div id="logout-modal-button-container">
              <button onClick={this.closeModal}>Cancel</button>
              <button onClick={this.logout}>Log out</button>
            </div>
          </Modal>
          {isLoggedIn && (
            <div>
              <span>
                {`$${(Number(this.state.user.balance) / 100).toFixed(2)}`}
              </span>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <span>{this.state.user.email}</span>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <Link to="/portfolio">Portfolio</Link>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <Link to="/transactions/">Transactions</Link>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Link to="/signup/">Sign Up</Link>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Link to="/login/">Log In</Link>
            </div>
          )}
        </div>
        <br />
        <div id="main">
          <Switch>
            <Route
              exact
              path="/login"
              component={() => (
                <AuthForm
                  history={history}
                  setUser={this.setUser}
                  isLogin={true}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={() => (
                <AuthForm
                  history={history}
                  setUser={this.setUser}
                  isLogin={false}
                />
              )}
            />
            <Route
              path="/portfolio"
              component={() => (
                <Portfolio
                  userId={this.state.user && this.state.user.id}
                  updateBalance={this.updateBalance}
                />
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
