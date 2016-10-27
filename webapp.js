var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//hashnode uses MongoClient
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
//var test = require('assert');
var port =  process.env.PORT || 3000;

//TODO: create separate routes
//TODO: use mongoose for db

//m'routes ** lets not use m'routes
//var routes = require('./app/routes.js');
//main routes?
//app.use('/', routes);

//express instance
var app = express();
var db;

//Connect to Mongo via MongoClient
var url = 'mongodb://localhost/bugsdb';
MongoClient.connect(url, function(err, dbConnection) {
    db = dbConnection;
    console.log("Connected correctly to server.");
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//GET

app.get('/api/bugs', function(req, res) {
    console.log('query string: ', req.query);
    var filter = {};
    if(req.query.priority)
        filter.priority = req.query.priority;
    if(req.query.status)
        filter.status = req.query.status;

    db.collection('bugs').find(filter).toArray(function(err, docs) {
        res.json(docs);
    })
});
//POST 5.2 testing
app.post('/api/bugs', function(req, res) {
    console.log('Req Body: ', req.body);
    var newBug = req.body;
    db.collection('bugs').insertOne(newBug, function(err, result) {
        var newBugID = result.insertedId;
        db.collection('bugs').find({ _id: newBugID}).next(function(err, doc) {
            res.json(doc);
        });
    });
});

//GET single DOC
app.get('/api/bugs/:id', function(req,res) {
    console.log('req.body ', req.body);
    if(!ObjectId.isValid(req.params.id)) {
        res.send('Id is not valid');
    } else {
        db.collection('bugs').findOne({_id:ObjectId(req.params.id)}, function(err, doc) {
            res.json(doc);
        });
    }
});

//PUT?? I don't know what it is
app.put('/api/bugs/:id', function(req,res) {
    var bug = req.body;
    console.log('modifying: ', req.params.id, bug);
    if(!ObjectId.isValid(req.params.id)) {
        res.send('Id is not valid');
    } else {
        var bugId = ObjectId(req.params.id);
        db.collection('bugs').updateOne({_id:bugId}, bug, function(err, result) {
            db.collection('bugs').find({_id:bugId}).next(function(err, doc) {
                res.json(doc);
            });
        });
    }

});

//listening on port
app.listen(port);
console.log( 'App listening on port ' + port );

