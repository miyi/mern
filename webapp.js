var express = require('express');
var port =  process.env.PORT || 3000;

//m'routes ** lets not use m'routes
//var routes = require('./app/routes.js');
//main routes?
//app.use('/', routes);

//express instance
var app = express();

app.use(express.static(__dirname + '/public'));



app.listen(port);
console.log( 'App listening on port ' + port );