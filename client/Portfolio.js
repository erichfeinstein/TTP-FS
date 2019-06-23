import React from 'react';
import axios from 'axios';

export default class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/users/${this.props.userId}/portfolio`
    );
    this.setState({
      stocks: data,
    });
  }

  render() {
    return (
      <div id="transactions-container">
        <h2>Portfolio</h2>
        <div className="table-container">
          {this.state.stocks.map((stock, i) => {
            return (
              <li key={i}>
                {stock.tickerSymbol}, {stock.count}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}
