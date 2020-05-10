const {} = require("./utils");
const GuildModel = require("./models/Guild");
const MemberModel = require("./models/Member");

module.exports.GuildModel = GuildModel;
module.exports.MemberModel = MemberModel;
module.exports = {
  Bot: require("./structures/client/Bot"),
  Command: require("./structures/handlers/Command"),
  Event: require("./structures/handlers/Event"),
};
