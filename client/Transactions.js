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
    const { data } = await axios.get(
      `/api/users/${this.props.userId}/purchases`
    );
    this.setState({
      purchases: data,
    });
    console.log(data);
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
                <span>{`@ $${purchase.pricePurchasedAt / 100}`}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
