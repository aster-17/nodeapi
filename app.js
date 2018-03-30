var express = require('express'); // requiring express module
var mongoose = require('mongoose'); // requiring mongoose module
var bodyParse = require('body-parser'); // requiring body-parser module
var path = require('path'); // Application root
var app = express(); // create the application
var port = process.env.PORT || 5000;
var user = require('./routes/user');



/**********************
  
  @@ configuring the HTTP server using express

**********************/

app.listen(port, function () {
  console.log('Test app running on port '+port+'!')	
});



/**********************
  
  @@ middleware to set the view engine variables

**********************/

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

/**********************
  
  @@ Body parser middle ware 

**********************/

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));

/**********************
  
  @@ routes middle ware

**********************/

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();

});

 app.use('/user', user);
 app.get('/', function (req, res) {
  res.send('You are into the root of API, try to browse other routes.')
})





