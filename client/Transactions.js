import React from 'react';
import axios from 'axios';

export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      purchases: [],
    };
  }

  async componentDidMount() {
    console.log(this.props.userId);
    const { data } = await axios.get(
      `/api/users/${this.props.userId}/transactions`
    );
    this.setState({
      purchases: data,
    });
  }

  render() {
    return (
      <div>
        <h2>Transactions</h2>
        <div id="transactions-container">
          {this.state.purchases.map(purchase => (
            <div>
              <div className="transaction-list-item">
                <span>
                  {`BUY (${purchase.tickerSymbol}) - ${
                    purchase.numberOfShares
                  } Shares`}
                </span>
                <span>{`@ $${purchase.priceTradedAt / 100}`}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
