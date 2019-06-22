const body = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

const PORT = 8080;
app.listen(PORT, function() {
  console.log('listening on port', PORT);
});
