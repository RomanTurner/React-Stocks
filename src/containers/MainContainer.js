import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";
const url = "http://localhost:3000/stocks";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    value: '',
    select: 'All',
  };

  handleSelect = (e) => {
    if (this.state.value !== 'All') {
       let x = [...this.state.stocks].filter(
         (el) => el.type === e.target.value
       );
       this.setState({
         stocks: x,
       });
    }
  }

  selectValue = (e) => {
    this.setState({
      select: e.target.value
    })
  }

  handleChange = (e) => {
    if (e.target.value === "Alphabetically"){
      this.sortAlphabetically(e);
    } else {
      this.sortByPrice(e);
   }
 
  }

  sortByPrice = (e) => {
       let x = [...this.state.stocks].sort((a, b) => {
         if (a.price > b.price) {
           return -1;
         }
         if (a.price < b.price) {
           return 1;
         }
         return 0;
       });

       this.setState({
         stocks: x,
         value: e.target.value,
       });
  }

  sortAlphabetically = (e) => {
       let x = [...this.state.stocks].sort((a, b) => {
         if (a.name < b.name) {
           return -1;
         }
         if (a.name > b.name) {
           return 1;
         }
         return 0;
       });

       this.setState({
         stocks: x,
         value: e.target.value,
       });
  }


  handleClick = (stock) => {
    stock.bought = !stock.bought;
    if (stock.bought) {
      this.buy(stock);
    } else {
      this.sell(stock)
    }
  }
  
  sell = (stock) => {
     let newStock = [...this.state.portfolio].filter(
       (s) => s.name !== stock.name);
     this.setState({
       stocks: [stock, ...this.state.stocks],
       portfolio: newStock,
     });
  }

  buy = (stock) => {
      let newStock = [...this.state.stocks].filter(
        (s) => s.name !== stock.name
      );
      this.setState({
        stocks: newStock,
        portfolio: [stock, ...this.state.portfolio],
      });
  }


  render() {
    return (
      <div>
        <SearchBar select={this.handleSelect} change={this.handleChange} value={this.selectValue} state={this.state}/>
        <div className='row'>
          <div className='col-8'>
            <StockContainer
              click={this.handleClick}
              stocks={this.state.stocks}
            />
          </div>
          <div className='col-4'>
            <PortfolioContainer
              click={this.handleClick}
              portfolio={this.state.portfolio}
            />
          </div>
        </div>
      </div>
    );
  }


  componentDidMount() {
    this.getStocks();
  }

  getStocks = () => {
    fetch(url)
      .then((r) => r.json())
      .then((stockList) => this.displayList(stockList))
      .catch((e) => console.error("error: ", e));
  };

  displayList = (stockList) => {
    stockList.forEach(el => el.bought =false)
    this.setState({
      stocks: stockList,
    });
  };
}

export default MainContainer;
