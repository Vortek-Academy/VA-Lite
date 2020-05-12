const { Command } = require("../../../Lib");

module.exports = class KickCommand extends Command {
  constructor() {
    super("kick", {
      description: "Kicks the mentioned user from the server",
      perms: ["KICK_MEMBERS"],
      botPerms: ["KICK_MEMBERS"],
      usage: "<Mention | ID> [Reason]",
    });
  }

  async run(message, [name, ...args]) {
    let kickMember;
    if (name) kickMember = await message.findMember(name);
    if (!kickMember)
      return message.sm(
        `Cannot find any users with the given info! Enter a valid ID/Tag/Mention!`
      );
    if (!message.comparePosition(kickMember))
      return message.sm(
        `You cannot kick them because they are higher than you in role hierarchy!`
      );
    if (!kickMember.kickable)
      return message.sm(`I cannot kick them because they are a mod/admin!`);
    if (kickMember.id === this.bot.user.id)
      return message.sm(`I cannot kick myself!`);
    if (kickMember.id === message.author.id)
      return message.sm(`You cannot kick yourself!`);

    let reason = args[0] ? args.join(" ") : "No reason given!";

    let modlog = message.guild.channels.cache.get(
      message.guild.db.moderationChannel
    );

    let logEmbed = message.embed
      .setTitle("Member Kicked From Server")
      .setColor("#d94337")
      .addField("Moderator", `${message.member} | ${message.author.id}`, true)
      .addField("User", `${kickMember} | ${kickMember.id}`, true)
      .addField("Reason", `**${reason}**`)
      .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }));

    await message.guild.db.moderation.push({
      action: "Kick",
      member: kickMember.id,
      user: message.author.id,
      reason: reason,
      date: Date.now(),
    });
    message.guild.db.save().catch(console.error);

    try {
      await kickMember.send(
        message.embed
          .setDescription(
            `You have been kicked from **${message.guild.name}**!\nReason: **${reason}**`
          )
          .setColor(this.bot.hex)
      );
    } catch (error) {
      message.sm(`The user's DMs were blocked!`);
    }

    await kickMember.kick(reason);
    message.sm(
      `**${kickMember.user.tag}** has been successfully kicked from the server!\nReason: **${reason}**`
    );
    if (modlog) modlog.send(logEmbed);
  }
};
