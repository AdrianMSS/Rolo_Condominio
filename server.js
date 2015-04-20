/**
* @description Module and archives used by the server
* @author Adrián Sánchez <asanchez@technergycr.com>
*/

//Dependencies
var express = require('express'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
  	nodemailer = require('nodemailer'),
    dbapp = require('./database');


//REST framework 
var app = express();
 
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use(express.static(__dirname + '/app'));


//Log Messages
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports.logger = logger;


//Mail Service
var transporter  = nodemailer.createTransport({
   service: 'Gmail',  // sets automatically host, port and connection security settings
   auth: {
       user: 'adriansanchez.logn@gmail.com',
       pass: 'Technergy14AMSS'
   },
   tls: {
       rejectUnauthorized: false
   }
});


//REST SERVICES

app.get('/Apart',  dbapp.getApart);
app.get('/Bien',  dbapp.getBien);

/**
* @description Sends the email confirmation to the user
* @param {req, res} request (JSON with the reservation info) send to the server and the response return by the server
* @returns email
*/
app.post('/email', function (req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'asanchez@technergycr.com', // receiver
     subject: 'Technergy: Desde la pagina web - Fecha: ' + fecha, // subject
     text: 'Correo: ' + req.body['email'] + '. \n'+ 'Nombre: ' + req.body['name'] + '. \n' + 'Texto: ' + req.body['text'] // body
     };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

//Redirect the user to the home page if the url is wrong
app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');
