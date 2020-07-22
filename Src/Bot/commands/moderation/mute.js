const { Command } = require("../../../Lib");
const ms = require("ms");

module.exports = class MuteCommand extends Command {
  constructor() {
    super("mute", {
      description: "Mutes a player permanently",
      perms: ["MANAGE_ROLES"],
      botPerms: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
      usage: "<Mention | ID> [Reason]",
    });
  }

  async run(message, [name, ...args]) {
    let member;
    if (name) member = await message.findMember(name);
    if (!member)
      return message.sm(
        `Cannot find any users with the given info! Enter a valid ID/Tag/Mention!`
      );
    if (!message.comparePosition(member))
      return message.sm(
        `You cannot mute them because they are higher than you in role hierarchy!`
      );
    if (!member.manageable)
      return message.sm(
        `Cannot edit roles for this user! Please check if they are higher than me in the role hierarchy!`
      );
    if (member.id === this.bot.user.id)
      return message.sm(`I cannot mute myself!`);
    if (member.id === message.author.id)
      return message.sm(`You cannot mute yourself!`);
    if (member.permissions.has("ADMINISTRATOR"))
      return message.sm(`You cannot mute an administrator!`);
    if (!member.db) await member.setDB();

    let modlog = message.guild.channels.cache.get(
      message.guild.db.moderationChannel
    );

    let reason = args.join(" ");
    if (reason.length < 1) reason = "No reason given!";

    let muterole = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );
    if (!muterole) {
      muterole = await message.guild.roles.create({
        data: { name: "Muted", permissions: [] },
      });
      await message.guild.channels.cache.forEach((c) => {
        c.overwritePermissions([
          {
            id: muterole.id,
            deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
          },
        ]);
      });
    }

    if (member.roles.cache.has(muterole.id))
      return message.sm(`This member is already muted on this server!`);
    await member.roles.add(muterole.id);

    try {
      await member.send(
        message.embed.setDescription(
          `You have been muted in ${message.guild.name}!\nReason: **${reason}**`
        )
      );
    } catch (error) {
      message.sm(`The user's DMs were blocked!`);
    }

    message.sm(
      `**${member.user.tag}** has been muted!\nReason: **${reason}**`,
      false
    );

    await message.guild.db.moderation.push({
      action: "Mute",
      member: member.id,
      user: message.author.id,
      reason: `${reason}`,
      date: Date.now(),
    });
    message.guild.db.save().catch(console.error);

    let logEmbed = message.embed
      .setTitle("Member Muted")
      .setColor("#d94337")
      .addField("Moderator", `${message.member} | ${message.author.id}`, true)
      .addField("User", `${member} | ${member.id}`, true)
      .addField("Reason", `**${reason}**`, true)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
    if (modlog) modlog.send(logEmbed);
  }
};
