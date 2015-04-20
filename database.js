var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('Reservaciones_CampoReal', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log('Connected to "Reservaciones_CampoReal" database');
    }
    else{
        console.log(404, 'Error Connecting to "Reservaciones_CampoReal" database');
    }
});

exports.getApart = function(req, res) {
    db.collection('Apartamentos').find().toArray(function(err, doc_apart) {

        if(err) throw err;

        if (!doc_apart) {
            console.log("No document found");
            
        }           
        else {
            res.send(200, doc_apart);
        }
    });
};

exports.getBien = function(req, res) {
    db.collection('BienComun').find().toArray(function(err, doc_bien) {

        if(err) throw err;

        if (!doc_bien) {
            console.log("No document found");
            
        }           
        else {
            res.send(200, doc_bien);
        }
    });
};