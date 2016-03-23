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
var Course = new mongoose.Schema({
  name: String,
  description: String,
});

//User Schema setting restrictions on document
var User = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  Instructor: Boolean
});

//Class Schema setting restrictions on document
var classSchema = new mongoose.Schema({
  date: Date,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
  Instructor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  eupapassed: Boolean,
  usersScheduled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  location: String
});

//creating model and collection name of Classes
var Class = mongoose.model("Class", classSchema);

var newClass = new Class ({
  date: 03/22/2016,

});

newClass.save(function(err, savedClass){
  if(err){
    console.log(err);
  } else {
    console.log(savedClass);
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
