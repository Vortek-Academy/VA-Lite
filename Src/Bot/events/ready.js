const { BotEvent } = require("../../Lib");
const server = require("../../../Web/server/server");
const OAuth2 = require("discord-oauth2");

module.exports = class Ready extends BotEvent {
  constructor() {
    super("ready");
  }

  async run(bot) {
    await bot.user.setPresence({
      activity: {
        name: `${bot.users.cache.size} users!`,
        type: "WATCHING",
      },
    });
    bot.hex = "#32a4a8";

    bot.oauth2 = new OAuth2({
      clientId: bot.user.id,
      clientSecret: bot.config.get("client"),
      redirectUri: bot.config.get("redirect"),
    });
    server(bot);
  }
};
