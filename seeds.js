var mongoose = require("mongoose");
var course = require("./models/course");
var training = require("./models/training");
var user = require("./models/user");

var courseDate = [
  {
    name: 'Barracuda Course',
    description: 'This is a course about Barracudas and their natural habitats'
  },
  {
    name: 'Seraphim Course',
    description: 'Seraphim course is about angels and what these ones really look like'
  },
  {
    name: 'Tuna Course',
    description: 'TUNA TUNA TUNA! Enough said.'
  }
];

var trainingData = [
  {
    date: 04/08/2016,
    time: 0800,
    location: 'Barracuda swimming tank'
  },
  {
    date: 04/10/2016,
    time: 1330,
    location: 'HIT offices'
  },
  {
    date: 04/12/2016,
    time: 1330,
    location: 'Yo Mommas house'
  }
];


function seedDB(){

}

courseData.forEach(function(seed){
  course.create(seed, function(err, course){
      if (err){
        console.log(err);
      } else {
        console.log(course);
      }
    }, function(){

      //add for each here for training.

    training.create({
      date: 03/30/2016,
      time: 0300,
      location: 'Barracuda swimming tank',
      }, function(err, training){

      //This function looks up the course and inserts the training into the courses array.
      course.findOne({name: "Barracuda Course"}, function(err, foundCourse){
        if(err){
          console.log(err);
        } else {
          foundCourse.training.push(training);
          foundCourse.save(function(err, data){
            if(err){
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      });
    });
    });
});
