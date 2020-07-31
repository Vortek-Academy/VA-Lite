const { searchQuery } = require("./utils");
const GuildModel = require("./models/Guild");
const Newsletter = require("./models/Newsletters");

module.exports.GuildModel = GuildModel;
module.exports.Newsletter = Newsletter;
module.exports = {
  Bot: require("./structures/client/Bot"),
  Command: require("./structures/handlers/Command"),
  BotEvent: require("./structures/handlers/Event"),
  searchQuery,
};
