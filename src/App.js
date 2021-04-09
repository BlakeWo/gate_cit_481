import React from 'react';
import './App.css';
import unirest from 'unirest';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
    this.fetchCryptoData = this.fetchCryptoData.bind(this);
  }

  componentDidMount() {
    console.log("App Component has mounted");
    console.log(this.state.cryptos);
  }

  fetchCryptoData = ()  => {
    const req = unirest("GET", "https://coinranking1.p.rapidapi.com/coins");
    let tempArray = [];

    // set headers for HTTP GET request
    req.headers({
      "x-rapidapi-key": "06c8ddbfb7msh87609e3fc655dc5p1b372fjsn9e847ef93c76",
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "useQueryString": true
    });

    // end function - set state
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      
      console.log(res.body.data.coins[0]);
      tempArray.push(res.body.data.coins[0].name);
      document.getElementById("crypto1").innerHTML = res.body.data.coins[0].name;
      document.getElementById("cp1").innerHTML = "$" + parseFloat(res.body.data.coins[0].price).toFixed(2);
      tempArray.push(res.body.data.coins[1].name);    
      document.getElementById("crypto2").innerHTML = res.body.data.coins[1].name;
      document.getElementById("cp2").innerHTML = "$" + parseFloat(res.body.data.coins[1].price).toFixed(2);
      tempArray.push(res.body.data.coins[2].name);  
      document.getElementById("crypto3").innerHTML = res.body.data.coins[2].name; 
      document.getElementById("cp3").innerHTML = "$" + parseFloat(res.body.data.coins[2].price).toFixed(2);
      tempArray.push(res.body.data.coins[3].name);    
      document.getElementById("crypto4").innerHTML = res.body.data.coins[3].name;
      document.getElementById("cp4").innerHTML = "$" + parseFloat(res.body.data.coins[3].price).toFixed(2);
      tempArray.push(res.body.data.coins[4].name);
      document.getElementById("crypto5").innerHTML = res.body.data.coins[4].name;   
      document.getElementById("cp5").innerHTML = "$" + parseFloat(res.body.data.coins[4].price).toFixed(2);
    });

    console.log("This is tempArray");
    console.log(tempArray);
    this.setState({cryptos: tempArray}, () => {
      console.log("After setting state");
      console.log(this.state.cryptos);
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <h1>GATE Team Crypto/Stocks App</h1>
            <p>
              View the top 5 highest performing Crypto currencies and Stocks. These rankings are based off of trends
              from the web.
            </p>
          </div>
        </header>
        <div className="row">
          <div>
            <button onClick={() => this.fetchCryptoData()}>
              Fetch Data
            </button>
          </div>
        </div>
        <div className="row" id="data">
          <div className="cryptoDiv">
            <table className="cryptoTable">
              <tr>
                <th className="tableTitle" colSpan="2">Crypto Currencies</th>
              </tr>
              <tr>
                <th>Coin Name</th>
                <th>Coin Price</th>
              </tr>
              <tr className="rowsTable1">
                <td id="crypto1">Tbd</td>
                <td id="cp1">Tbd</td>
              </tr>
              <tr className="rowsTable1">
                <td id="crypto2">Tbd</td>
                <td id="cp2">Tbd</td>
              </tr>
              <tr className="rowsTable1">
                <td id="crypto3">Tbd</td>
                <td id="cp3">Tbd</td>
              </tr>
              <tr className="rowsTable1">
                <td id="crypto4">Tbd</td>
                <td id="cp4">Tbd</td>
              </tr>
              <tr className="rowsTable1">
                <td id="crypto5">Tbd</td>
                <td id="cp5">Tbd</td>
              </tr>
            </table>
          </div>
          <div className="stocksDiv">
            <table className="stocksTable">
              <tr>
                <th className="tableTitle" colSpan="2">Stocks</th>
              </tr>
              <tr>
                <th>Stock Name</th>
                <th>Stock Price</th>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
