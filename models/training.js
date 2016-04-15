var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
  date: String,
  location: String,
  time: String
});


module.exports = mongoose.model("training", trainingSchema);
