import React from 'react';
import axios from 'axios';
import { TransactionListItem } from './TransactionListItem';

export default class Transactions extends React.Component {
  constructor() {
    super();
    this.state = {
      purchases: [],
    };
  }

  async componentDidMount() {
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
          {this.state.purchases.map((purchase, index) => (
            <TransactionListItem purchase={purchase} key={index} />
          ))}
        </div>
      </div>
    );
  }
}
