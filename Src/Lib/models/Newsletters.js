const { Schema, model } = require("mongoose");

const newSchema = new Schema({
  name: String,
  email: String,
});

const Newsletter = model("newsletters", newSchema);
module.exports = Newsletter;
