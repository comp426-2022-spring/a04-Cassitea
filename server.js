// Require Express
var express = require('express')
var app = express()

// Require minimist
const args = require('minimist')(process.argv.slice(2))

// Require fs
const fs = require('fs')

// Require morgan 
const morgan = require('morgan')

// Require db script file
const db = require('./database.js')


args['port']
const HTTP_PORT = args.port || 5000 || process.env.PORT

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});


//API
app.get('/app/', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
});

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({'flip' : coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const count = countFlips(flips);
    res.status(200).json({'raw': flips, 'summary': count})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
});

app.use(function (req, res) {
    res.status(404).end('404 NOT FOUND')
    res.type('text/plain')
});


//COIN FUNCTIONS

function coinFlip() {
    return Math.random() > 0.5 ? "heads" : "tails"
  }
  
  function coinFlips(flips) {
    const result = [];
    for (var i=0; i<flips; i++) {
      result[i] = coinFlip();
    }
    return result;
  }
  
  function countFlips(array) {
    var headCount = 0;
    var tailCount = 0;
  
    for(var i=0;i<array.length; i++) {
      if (array[i] === 'heads'){
        headCount++;
      } else {
        tailCount++;
      }
    }
    return {heads: headCount, tails: tailCount};
  }
  
  function flipACoin(call) {
    var flip = coinFlip();
  
    if (call == flip) {
      return {call: call, flip: flip, result: 'win'}
    } else {
      return {call: call, flip: flip, result: 'lose'}
    }
  }