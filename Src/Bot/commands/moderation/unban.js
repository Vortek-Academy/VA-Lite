const { Command } = require("../../../Lib");

module.exports = class BanCommand extends Command {
  constructor() {
    super("unban", {
      description: "Unbans the mentioned user from the server",
      perms: ["BAN_MEMBERS"],
      botPerms: ["BAN_MEMBERS"],
      usage: "<ID> [Reason]",
    });
  }

  async run(message, [name, ...args]) {
    if (!name) return message.sm(`Please provide a valid username/id`);
    const banMember = await this.bot.users.fetch(name);
    if (!banMember) return message.sm(`Unable to find the specified member`);
    const reason = args[0] ? args.join(" ") : "Reason not provided";
    try {
      await message.guild.unban(banMember);
    } catch (e) {
      console.log(e);
    }

    let modlog = message.guild.channels.cache.get(
      message.guild.db.moderationChannel
    );

    let logEmbed = message.embed
      .setTitle("Member Unbanned From Server")
      .setColor("#d94337")
      .addField("Moderator", `${message.member} | ${message.author.id}`, true)
      .addField("User", `${banMember} | ${banMember.id}`, true)
      .addField("Reason", `**${reason}**`)
      .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }));

    await message.guild.db.moderation.push({
      action: "Unban",
      member: banMember.id,
      user: message.author.id,
      reason: reason,
      date: Date.now(),
    });
    message.guild.db.save().catch(console.error);

    await message.guild.unban(banMember);
    message.sm(
      `**${banMember.user.tag}** has been successfully unbanned from the server!\nReason: **${reason}**`
    );
    if (modlog) modlog.send(logEmbed);
  }
};
