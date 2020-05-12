const { Command } = require("../../../Lib");

module.exports = class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      description: "Allows you to change the bot prefix",
      perms: ["ADMINISTRATOR"],
      usage: "<New Value>",
    });
  }

  async run(message, [key, ...args]) {
    if (!key) return message.sm(`Please input the new prefix value!`);

    message.guild.db.prefix = key;
    message.guild.db.save().catch(console.log);

    message.sm(`Server prefix changed to \`${key}\`!`);
  }
};
