var express         = require ('express');
var app             = express();
var ejs             = require ('ejs');
var mongoose        = require('mongoose');
var course          = require("./models/course");
var training        = require("./models/training");
var user            = require("./models/user");
var seedDB          = require("./seeds.js");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");




//////////////////
//Connection to database and seed.
//////////////////

//connection to database its local host because its on my machine.
mongoose.connect('mongodb://localhost/Precise', function(){
  console.log('Successful Connection to Data Base Server.');
});
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

seedDB();


/////////////////////////
//This is the get and post stuff area
////////////////////////

// Route ROUTE
app.get('/', function(req, res){
    res.redirect('/training');
});

// TRAINING INDEX ROUTE This route to show all trainings
app.get('/training', function(req, res){
  course.find({}).populate("training").exec(function(err, training){
    if(err){
      console.log(err);
    } else {
    res.render('home', {training: training});
    }
  });
});

// TRAINING NEW ROUTE this is the new route it will take you to the form.
app.get('/training/new', function(req, res){
  course.find({}).populate("training").exec(function(err, training){
    if(err){
      console.log(err);
    } else {
    res.render('newTraining', {training: training});
  }
});
});

// TRAINING CREATE ROUTE
app.post("/training", function(req, res){

  training.create(req.body.training, function (err, training){
    //This function looks up the course and inserts the training into the courses array.
    course.findById(req.body.course.name, function (err, foundCourse){
      if(err){
        console.log(err);
      } else {
        foundCourse.training.push(training._id);
        training.course.push(foundCourse._id);
        foundCourse.save(function(err, data){
          if(err){
            console.log(err);
          } else {
            console.log(data);
            res.redirect("/training");
          }
        });
      }
    });
  });
});

// TRAINING SHOW ROUTE
app.get("/training/:id", function(req, res){
  course.findOne({'training': req.params.id}, function(err, foundCourse){
    user.findOne({'scheduledTrainings': req.params.id}, function(err, foundUsers){
      training.findById(req.params.id, function(err, foundTraining){
        if (err){
          console.log(err);
        } else {
          res.render("showTraining", {training: foundTraining, course: foundCourse, users: foundUsers});
        }
      });
    });
  });
});

// TRAINING EDIT ROUTE
app.get("/training/:id/edit", function(req, res){
  course.findOne({'training': req.params.id}, function(err, foundCourse){
    user.findOne({'scheduledTrainings': req.params.id}, function(err, foundUsers){
      training.findById(req.params.id, function(err, foundTraining){
        if (err){
          console.log(err);
        } else {
          res.render("editTraining", {training: foundTraining, course: foundCourse, users: foundUsers});
        }
      });
    });
  });
});

// TRAINING UPDATE ROUTE
app.put("/training/:id", function(req, res){
  training.findByIdAndUpdate(req.params.id, req.body.training, function(err, updatedTraining){
    if(err){
      console.log(err);
      res.redirect("/training");
    }else{
      res.redirect("/training/" + req.params.id);
    }
  });
});

// TRAINING DELETE ROUTE
app.delete("/training/:id", function(req, res){
  training.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/training");
    }else{
      res.redirect("/training");
    }
  });
});

// TRAINING BAD ROUTE
app.get('*', function(req, res){
  res.send('bad route');
});

var server = app.listen(3000, function(){
  console.log('Listening to port 3000');
});
