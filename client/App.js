import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Components
import Transactions from './Transactions';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <div id="nav-bar">
            <div>
              <Link to="/portfolio">Portfolio</Link>
            </div>
            <div>
              <Link to="/transactions/">Transactions</Link>
            </div>
          </div>
          <h1 id="title">Stocks App</h1>
          {/* <Route path="/portfolio" component={Portfolio} /> */}
          <Route path="/transactions/" component={Transactions} />
        </div>
      </Router>
    );
  }
}
