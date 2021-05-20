import React from 'react';
import './App.css';
import Chart from "../node_modules/chart.js/dist/chart.js";
import unirest from 'unirest';
import request from 'request';

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
    this.fetchCryptoData();
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
      const decimals = 3;
      console.log(res);
      const res2 = res.body;
      console.log(res2);
      document.getElementById("name1").innerHTML = res2.data.coins[0].name;
      document.getElementById("value1").innerHTML = "$" + Number(res2.data.coins[0].price).toFixed(2);
      document.getElementById("name2").innerHTML = res2.data.coins[1].name;
      document.getElementById("value2").innerHTML = "$" + Number(res2.data.coins[1].price).toFixed(2);
      document.getElementById("name3").innerHTML = res2.data.coins[2].name;
      document.getElementById("value3").innerHTML = "$" + Number(res2.data.coins[2].price).toFixed(2);
      document.getElementById("name4").innerHTML = res2.data.coins[3].name;
      document.getElementById("value4").innerHTML = "$" + Number(res2.data.coins[3].price).toFixed(2);
      document.getElementById("name5").innerHTML = res2.data.coins[4].name;
      document.getElementById("value5").innerHTML = "$" + Number(res2.data.coins[4].price).toFixed(2);
      var chart1 = new Chart(document.getElementById("cryptoChart"), {
        type: 'bar',
        data: {
          labels: [res.body.data.coins[0].name, res.body.data.coins[1].name, res.body.data.coins[2].name, res.body.data.coins[3].name, res.body.data.coins[4].name],
          datasets: [
            {
              label: 'Top Crypto Coins!',
              data: [parseFloat(res.body.data.coins[0].price).toFixed(2),
              parseFloat(res2.data.coins[1].price).toFixed(2),
              parseFloat(res2.data.coins[2].price).toFixed(2),
              parseFloat(res2.data.coins[3].price).toFixed(2),
              parseFloat(res2.data.coins[4].price).toFixed(2)
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
              ],
              borderWidth: 1
            }
          ],
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value.toFixed(decimals);
                    }
                }
            }]
        }
        }
      });
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
        {/* <!-- // Navigation Bar --> */}
      
      <nav>
        <a href="#start">Project</a>
        <a href="#group">Members</a>
        <a href="">Log In</a>
        <a href=" ">Sign Up</a>
      </nav>
      
      <header id="start">
        <div className="content-wrap">
          <h1>Team Gate Project</h1>
          <h2>Our Project</h2>
          <p>This application takes the current top 5 moving cryptocurrencies and displays them to the user within a table along with  their
            respective data.</p>
        </div>
      </header>
      
      <main>
        {/* <!-- // TABLES AND VALUES --> */}
        <section id="project">
          
         {/* <!-- THIS IS WHERE THE GRAPH CAN GO: ABOVE THE TABLE DATA --> */}
          <div style={{width: "800px", height: "500px", margin: "0px auto"}}>
            <canvas id="cryptoChart" width="800px" height="400px"></canvas>
          </div>
    
          {/* <!-- END OF GRAPH SECTION --> */}
          
          <div id="crypto">
            <table className="center">
              <caption>Crypto</caption>
              <tr className="title">
                <th id="company">Cryptocurrency</th>
                <th>Value</th>
              </tr>
              <tr>
                <td id="name1"></td>
                <td id="value1"></td>
              </tr>
              <tr>
                <td id="name2"></td>
                <td id="value2"></td>
              </tr>
              <tr>
                <td id="name3"></td>
                <td id="value3"></td>
              </tr>
              <tr>
                <td id="name4"></td>
                <td id="value4"></td>
              </tr>
              <tr>
                <td id="name5"></td>
                <td id="value5"></td>
              </tr>
            </table>
          </div>
          
          
          
        </section>
        
        {/* <!-- THIS WAS NECESSARY TO GIVE THE TABLES A BACKGROUND FOR SOME REASON --> */}
        <section id="filler">
          <div className="button-container">
            <div className="center-button">
              <button className="btn">TO THE MOON MY FRIENDS</button>
            </div>
          </div>
        </section>
       
        {/* <!-- GROUP SECTION --> */}
        <section id="group">
          <div className="middle">
            <h2>Group Members</h2>
          </div>
            <div className="team">
              <h3>Blake Wolf</h3>
            </div>
            <div className="team">
              <h3>Cedric Dones</h3>
            </div>
            <div className="team">
              <h3>David Hernandez</h3>
            </div>
            <div className="team">
              <h3>Erik Landaverde</h3>
            </div>
            
          
        </section>
        

      </main>
      </div>
    );
  }
}

export default App;
