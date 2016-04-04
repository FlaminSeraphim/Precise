var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  training: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "training"
  }],
});

module.exports = mongoose.model("course", courseSchema);
