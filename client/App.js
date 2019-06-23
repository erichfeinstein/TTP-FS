import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

//Components
import Transactions from './Transactions';
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
    console.log(data);
  }

  render() {
    return (
      <Router>
        <div id="nav-bar">
          <div>
            <Link to="/portfolio">Portfolio</Link>
          </div>
          <div>
            <Link to="/transactions/">Transactions</Link>
          </div>
        </div>
        <br />
        <AuthForm />
        <div id="main">
          <h1 id="title">Stocks App</h1>
          <hr />
          {/* <Route path="/portfolio" component={Portfolio} /> */}
          <Route path="/transactions/" component={Transactions} />
        </div>
      </Router>
    );
  }
}
