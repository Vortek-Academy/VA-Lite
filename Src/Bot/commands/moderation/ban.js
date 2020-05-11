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

  async run(message, [name, ...reason]) {
  if (!name) return message.sm("Please provide a member");
  const target = message.findMember(name);
  if (!target) return message.sm("Unable to find the specified member");
  const r = reason.join(" ") || "Reason not provided";
  const position = message.position(target);
  if (position <= 0) return message.sm("Member has higher or equal role than you");

  }
}