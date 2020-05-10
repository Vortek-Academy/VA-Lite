const { Schema, model } = require("mongoose");

const GuildSchema = new Schema({
  id: String,
  prefix: String,
  mutes: Array,
  moderation: Array,
  moderationChannel: String,
})

const GuildModel = model("guild", GuildSchema);
module.exports = GuildModel;
