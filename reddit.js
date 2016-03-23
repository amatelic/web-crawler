// var app = require('./server/server');
var bodyParser = require('body-parser');
var express = require('express');
const PORT = 4000;
var app = express();


app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use('/', require('./controllers/index.js'));

app.listen(PORT, function() {
  console.log(`Crawler app is running on port ${PORT}!`);
});

// console.log(app._router.stack);
