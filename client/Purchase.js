import React from 'react';
import axios from 'axios';

export default class Purchase extends React.Component {
  constructor() {
    super();
    this.state = {
      tickerSymbol: '',
      numberOfShares: 0,
      tickerSymbolError: false,
      insufficientFundsError: false,
      stockInfo: null,
    };
  }

  render() {
    return (
      <div id="purchase-container">
        <h2>Purchase</h2>
        <div>Ticker Symbol</div>
        <br />
        <input
          placeholder="ex: AAPL"
          className="form-field"
          onBlur={async () => {
            if (this.state.tickerSymbol.length > 0) {
              const { data } = await axios.get(
                `/api/stocks/${this.state.tickerSymbol}`
              );
              if (data === -1)
                this.setState({
                  tickerSymbolError: true,
                  stockInfo: null,
                });
              else {
                this.setState({
                  tickerSymbolError: false,
                  stockInfo: data,
                });
              }
            }
          }}
          onChange={evt => {
            this.setState({
              tickerSymbol: evt.target.value,
              insufficientFundsError: false,
            });
          }}
        />
        <br />
        {(this.state.tickerSymbolError || this.state.stockInfo) && (
          <div className="info-section">
            {this.state.tickerSymbolError && (
              <div className="error">Error! Stock Not Found</div>
            )}
            {this.state.stockInfo && (
              <div className="info">
                <span>{this.state.stockInfo.companyName}</span>
                <span>${this.state.stockInfo.latestPrice}</span>
              </div>
            )}
            <br />
          </div>
        )}
        <div>Number of Shares</div>
        <br />
        <input
          placeholder="ex: 5"
          className="form-field"
          onChange={evt =>
            this.setState({
              numberOfShares: evt.target.value,
              insufficientFundsError: false,
            })
          }
        />
        <br />
        {this.state.insufficientFundsError && (
          <div>
            <div className="error">Error! Insufficient Funds</div>
            <br />
          </div>
        )}
        <button
          disabled={
            this.state.insufficientFundsError || this.state.tickerSymbolError
          }
          onClick={async () => {
            try {
              const res = await this.props.purchase(
                this.state.tickerSymbol,
                this.state.numberOfShares
              );
            } catch (err) {
              if (err.response && err.response.status === 304)
                this.setState({
                  insufficientFundsError: true,
                });
              else {
                console.error(err);
              }
            }
          }}
        >
          Purchase
        </button>
      </div>
    );
  }
}
