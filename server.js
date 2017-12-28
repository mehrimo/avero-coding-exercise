"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/tables', function(req, res) {
  res.send({tables: tables});
});

// middleware function
// app.use('/items', items);

app.get('/items', function(req, res) {
  res.send({items: items});
});

app.get('/checks', function(req, res) {
  res.send({checks: checks});
});

app.get('/checks/:id', function(req, res) {
  var id = req.params.id;
  res.send({checks: checks});
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});
