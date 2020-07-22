const { BotEvent } = require("../../Lib");
const server = require("../../../Web/server/server");

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

    server(bot);
  }
};
