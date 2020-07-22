const { searchQuery } = require("./utils");
const GuildModel = require("./models/Guild");

module.exports.GuildModel = GuildModel;
module.exports = {
  Bot: require("./structures/client/Bot"),
  Command: require("./structures/handlers/Command"),
  BotEvent: require("./structures/handlers/Event"),
  searchQuery,
};
