const { Schema, model } = require("mongoose");

const MemberSchema = new Schema({
  id: String,
  guild: String,
});

const Member = model("member", MemberSchema);
module.exports = Member;
