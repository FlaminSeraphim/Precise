var express = require ('express');
var app = express();
var ejs = require ('ejs');
var  mongoose = require('mongoose');

//////////////////
//Schema and models and database connection
//////////////////

//connection to database its local host because its on my machine.
mongoose.connect('mongodb://localhost/my_database', function(){
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

var course = mongoose.model("course", courseSchema);

// course.create({
//   name: 'Test Course',
//   description: 'This is the description for the Test Course'
// }, function(err, course){
//   if (err){
//     console.log(err);
//   } else {
//     console.log(course);
//   }
// });

//User Schema setting restrictions on document
var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  instructor: Boolean,
  trainingsTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }],
  passedTrainings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }],
  scheduledTrainings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }]
});

var user = mongoose.model("user", userSchema);

// user.create({
//   firstname: 'Brian',
//   lastname: 'Coates',
//   username: 'bmcoate',
//   password: '1234',
//   instructor: true
// }, function(err, user){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

//Training Schema setting restrictions on document
//optional pushes to arrays are the (user table) trainingsTaught,
//passedTrainings, scheduledTrainings, and (courses table) trainings
var trainingSchema = new mongoose.Schema({
  date: Date,
  location: String
});

//creating model and collection name of training
var training = mongoose.model("training", trainingSchema);

training.create({
  date: 03/22/2016,
  location: 'HIT',

}, function(err, training){

  if(err){
    console.log(err);
  } else {
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
