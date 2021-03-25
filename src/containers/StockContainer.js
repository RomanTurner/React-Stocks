import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {


  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks && this.props.stocks.map(s => <Stock click={this.props.click} key={s.id} stock={s}/>)}
      </div>
    );
  }

}

export default StockContainer;
