var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
  date: String,
  location: String,
  time: String,
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course"
  }],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }]
});


module.exports = mongoose.model("training", trainingSchema);
