const { Command } = require("../../../Lib");

module.exports = class LogChannelCommand extends Command {
  constructor() {
    super("logChannel", {
      description: "Set the mod actions log channel for the server",
      perms: ["ADMINISTRATOR"],
      usage: "<Channel ID | MENTION>",
    });
  }

  async run(message, [key, ...args]) {
    let nChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(key);
    if (!nChannel)
      return message.sm(`Please enter a proper channel ID or mention!`);

    message.guild.db.moderationChannel = nChannel.id;
    message.guild.db.save().catch(console.error);

    message.sm(`Mod-log updated to ${nChannel}!`);

    let logEmbed = message.embed
      .setTitle(`Modlog Changed`)
      .setColor(this.bot.hex)
      .addField(`Moderator`, `${message.member} | ${message.author.id}`)
      .addField("Action", `Changed mod-logs to:\n${nChannel} | ${nChannel.id}`);

    await nChannel.send(logEmbed);
  }
};
