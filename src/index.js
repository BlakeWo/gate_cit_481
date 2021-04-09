import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import unirest from 'unirest';

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

  tempArray.push(res.body.data.coins[0].name);
  tempArray.push(res.body.data.coins[1].name);    
  tempArray.push(res.body.data.coins[2].name);    
  tempArray.push(res.body.data.coins[3].name);    
  tempArray.push(res.body.data.coins[4].name);    
});

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
