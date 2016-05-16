var mongoose = require("mongoose");

var trainingSchema = new mongoose.Schema({
  date: String,
  location: String,
  time: String,
  status: String
});


module.exports = mongoose.model("training", trainingSchema);
