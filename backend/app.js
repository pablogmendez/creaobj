var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var morgan  = require('morgan')
var app = express();


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.use(morgan('combined'));
app.use(require('./middleware/cors'));


require('./routes')(app);


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
