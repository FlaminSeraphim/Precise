var express = require ('express');
var app = express();
var ejs = require ('ejs');
var  mongoose = require('mongoose');

//////////////////
//Schema and models and database connection
//////////////////

//connection to database its local host because its on my machine.
mongoose.connection('mongodb://localhost/my_database', function(){
  console.log('Successful Connection to Server.');
});

//Course Schema setting restrictions on document
var courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  training: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }],
});

//User Schema setting restrictions on document
var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  Instructor: Boolean,
  trainingsTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }],
  scheduledTrainings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }]
});

//Training Schema setting restrictions on document
var trainingSchema = new mongoose.Schema({
  date: Date,
  eupapassed: Boolean,
  location: String
});

//creating model and collection name of training
var training = mongoose.model("training", trainingSchema);

var newTraining = new training ({
  date: 03/22/2016,
});

newTraining.save(function(err, savedTraining){
  if(err){
    console.log(err);
  } else {
    console.log(savedTraining);
  }
});

/////////////////////////
//This is the get and post stuff area
////////////////////////
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('home');
});

app.get('*', function(req, res){
  res.send('bad route');
});

var server = app.listen(3000, function(){
  console.log('Listening to port 3000');
});
