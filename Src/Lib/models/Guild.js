const { Schema, model } = require("mongoose");

const GuildSchema = new Schema({
  id: String,
  prefix: String,
  moderation: Array,
  moderationChannel: String,
});

const GuildModel = model("guild", GuildSchema);
module.exports = GuildModel;
