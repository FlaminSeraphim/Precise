var express = require ('express');
var app = express();
var ejs = require ('ejs');
var  mongoose = require('mongoose');



//////////////////
//Schema and models and database connection
//////////////////

//connection to database its local host because its on my machine.
mongoose.connect('mongodb://localhost/my_database', function(){
  console.log('Successful Connection to Data Base Server.');
});
app.use(express.static('public'));
app.set('view engine', 'ejs');

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
//   name: 'Barracuda Course',
//   description: 'This is a course about Barracudas and their natural habitats'
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
//   firstname: 'Lauren',
//   lastname: 'Coates',
//   username: 'lcoates',
//   password: '1234',
//   instructor: false
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

// training.create({
//   date: 03/30/2016,
//   location: 'Barracuda swimming tank',
// }, function(err, training){
//
//   //This function looks up the course and inserts the training into the courses array.
//   course.findOne({name: "Barracuda Course"}, function(err, foundCourse){
//     if(err){
//       console.log(err);
//     } else {
//       foundCourse.training.push(training);
//       foundCourse.save(function(err, data){
//         if(err){
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       });
//     }
//   });
//
//   //This is taking the training and putting it in the users document for brian.
//   user.findOne({firstname: "Brian"}, function(err, foundUser){
//     if(err){
//       console.log(err);
//     } else {
//       foundUser.trainingsTaught.push(training);
//       foundUser.passedTrainings.push(training);
//       foundUser.scheduledTrainings.push(training);
//       foundUser.save(function(err, data){
//         if(err){
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       });
//     }
//   });
// });


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
