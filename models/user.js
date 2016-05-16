var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  instructor: Boolean,
  manager: String,
  emailAddress: String,
  phone: Number,
  title: String,
  department: String,
  clinic: String,
  administrator: Boolean,
  isManager: Boolean,
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

module.exports = mongoose.model("user", userSchema);
