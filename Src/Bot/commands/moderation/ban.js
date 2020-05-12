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
    let banMember;
    if (name) banMember = await message.findMember(name);
    if (!banMember)
      return message.sm(
        `Cannot find any users with the given info! Enter a valid ID/Tag/Mention!`
      );
    if (!message.comparePosition(banMember))
      return message.sm(
        `You cannot ban them because they are higher than you in role hierarchy!`
      );
    if (!banMember.bannable)
      return message.sm(`I cannot ban them because they are a mod/admin!`);
    if (banMember.id === this.bot.user.id)
      return message.sm(`I cannot ban myself!`);
    if (banMember.id === message.author.id)
      return message.sm(`You cannot ban yourself!`);

    let reason = args[0] ? args.join(" ") : "No reason given!";

    let modlog = message.guild.channels.cache.get(
      message.guild.db.moderationChannel
    );

    let logEmbed = message.embed
      .setTitle("Member Banned From Server")
      .setColor("#d94337")
      .addField("Moderator", `${message.member} | ${message.author.id}`, true)
      .addField("User", `${banMember} | ${banMember.id}`, true)
      .addField("Reason", `**${reason}**`)
      .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }));

    await message.guild.db.moderation.push({
      action: "Ban",
      member: banMember.id,
      user: message.author.id,
      reason: reason,
      date: Date.now(),
    });
    message.guild.db.save().catch(console.error);

    try {
      await banMember.send(
        message.embed
          .setDescription(
            `You have been banned from **${message.guild.name}**!\nReason: **${reason}**`
          )
          .setColor(this.bot.hex)
      );
    } catch (error) {
      message.sm(`The user's DMs were blocked!`);
    }

    await banMember.ban({ reason: reason });
    message.sm(
      `**${banMember.user.tag}** has been successfully banned from the server!\nReason: **${reason}**`
    );
    if (modlog) modlog.send(logEmbed);
  }
};
