'use strict';

//call the packages needed
var express = require('express');
var app = express();
//npm install the bodyparser
var bodyParser = require('body-parser')
var api = require('../app/api/timestamp.js');
var routes = require('../app/routes/index.js');


//configure app to use bodyParser()
//this will let us get data from a POST
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));
//parse application json
app.use(bodyParser.json());
//serve static file (such as images, CSS or JS files) with this middleware function in a directory called public
//now I can load files in the public directory ex http://localhost:3000/images/kitten.jpg
app.use('/public', express.static(process.cwd() + '/public'));

//set up our port
var port = process.env.PORT || 8080;

//the format follow as, alias to use for the real path, also allows permission to such path
//app.use('/api', express.static(process.cwd() + '/app/api'));

routes(app);
api(app);

app.listen(port, function() {
    console.log('Node.js is listening on port' + port);
});