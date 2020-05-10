const { Event } = require("../../Lib");

module.exports = class Ready extends Event {
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
  }
};
