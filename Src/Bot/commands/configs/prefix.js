const { Command } = require("../../../Lib");

module.exports = class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      description: "Allows you to change the bot prefix",
      perms: ["ADMINISTRATOR"],
      usage: "<New Value>",
    });
  }

  async run(message, [key, ...args]) {}
};
