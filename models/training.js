var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
  date: Date,
  location: String,
  time: Number
});


module.exports = mongoose.model("training", trainingSchema);
