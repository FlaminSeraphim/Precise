var express   = require ('express');
var app       = express();
var ejs       = require ('ejs');
var mongoose  = require('mongoose');
var course    = require("./models/course");
var training  = require("./models/training");
var user      = require("./models/user");
var seedDB    = require("./seeds.js");




//////////////////
//Connection to database and seed.
//////////////////

//connection to database its local host because its on my machine.
mongoose.connect('mongodb://localhost/Precise', function(){
  console.log('Successful Connection to Data Base Server.');
});
app.use(express.static('public'));
app.set('view engine', 'ejs');

seedDB();

/////////////////////////
//This is the get and post stuff area
////////////////////////

app.get('/', function(req, res){
    res.redirect('/training');
});

// This route is for the sh
app.get('/training', function(req, res){
  course.find({}).populate("training").exec(function(err, training){
    if(err){
      console.log(err);
    } else {
    res.render('home', {training: training});
    }
  });
});

app.get('/training/new', function(req, res){
  res.render('newTraining');
});

app.get('*', function(req, res){
  res.send('bad route');
});

var server = app.listen(3000, function(){
  console.log('Listening to port 3000');
});
