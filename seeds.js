var mongoose = require("mongoose");
var course = require("./models/course");
var training = require("./models/training");
var user = require("./models/user");

var courseData = [
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
    description: 'TUNA! TUNA! TUNA! Enough said.'
  }
];

var trainingData = [
  {
    date: '04/08/2016',
    time: '08:00',
    location: 'Barracuda swimming tank'
  },
  {
    date: '04/10/2016',
    time: '13:30',
    location: 'HIT offices'
  },
  {
    date: '04/12/2016',
    time: '1330',
    location: 'Yo Mommas house'
  }
];


function seedDB(){

  course.remove({}, function(err){
    if(err){
      console.log(err);
    }
    courseData.forEach(function(seed){
      course.create(seed, function(err, course){
        if (err){
          console.log(err);
          } else {
          //console.log(course);
          }
      }, function(){
        training.remove({}, function(err){
          trainingData.forEach(function(seed){
            training.create(seed,function(err, training){

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
                      //console.log(data);
                    }
                  });
                }
              });
            });
          });
        });
      });
    });
  });
}

module.exports = seedDB;

//code to create users if you need.
// user.create({
//   firstname: 'Cody',
//   lastname: 'Frieden',
//   username: 'codydf',
//   password: '1234',
//   instructor: true
// }, function(err, user){
//   if(err){
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
