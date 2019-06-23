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
    console.log('purchases', data);
  }

  render() {
    return (
      <div id="transactions-container">
        <h2>Transactions</h2>
      </div>
    );
  }
}
