const { Command } = require("../../../Lib");

module.exports = class UnmuteCommand extends Command {
  constructor() {
    super("unmute", {
      description: "Un-mutes a player before the given time",
      perms: ["MANAGE_ROLES"],
      botPerms: ["MANAGE_ROLES"],
      usage: "<Mention | ID> <Reason>",
    });
  }

  async run(message, [name, ...args]) {
    let member;
    if (name) member = await message.findMember(name);
    if (!member)
      return message.sm(`Cannot find any users with the given info!`);
    if (!message.comparePosition(member))
      return message.sm(
        `You cannot do that because they are higher than you in role hierarchy!`
      );
    if (!member.manageable)
      return message.sm(
        `Cannot edit roles for this user! Please check if they are higher than me in the role hierarchy!`
      );
    if (!member.db) await member.setDB();

    let reason = args[0] ? args.join(" ") : "No reason given!";
    let modlog = message.guild.channels.cache.get(
      message.guild.db.moderationChannel
    );
    let muterole = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );

    if (!muterole || !member.roles.cache.has(muterole.id))
      return message.sm(`This member is not muted!`);
    await member.roles.remove(muterole.id);

    try {
      await member.send(
        message.embed
          .setDescription(`You have been un-muted in ${message.guild.name}!`)
          .setColor(this.bot.hex)
      );
    } catch (error) {
      message.sm(`The user's DMs were blocked!`);
    }
    message.sm(`**${member.user.tag}** has been un-muted!`, false);

    let logEmbed = message.embed
      .setTitle("Member Un-Muted")
      .setColor("#23d160")
      .addField("Moderator", `${message.member} | ${message.author.id}`, true)
      .addField("User", `${member} | ${member.id}`, true)
      .addField("Reason", `**${reason}**`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    member.db.mute = 0;
    member.db.save().catch(console.error);

    await message.guild.db.moderation.push({
      action: "Unmute",
      member: member.id,
      user: message.author.id,
      reason: reason,
      date: Date.now(),
    });
    message.guild.db.save().catch(console.error);

    if (modlog) modlog.send(logEmbed);
  }
};
