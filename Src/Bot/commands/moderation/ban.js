const { Command } = require("../../../Lib");

module.exports = class BanCommand extends Command {
  constructor() {
    super("ban", {
      description: "Bans the mentioned user from the server",
      perms: ["BAN_MEMBERS"],
      botPerms: ["BAN_MEMBERS"],
      usage: "<Mention | ID> [Reason]",
    });
  }

  async run(message, [name, ...args]) {
  if (!name) return message.sm("Please provide a member");
  const target = message.
  }
}