const { BotEvent } = require("../../Lib");

module.exports = class GuildMemberAdd extends BotEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(member) {
    if (member.user.bot) return;
    member.roles.add("593064627202686976");
  }
};
