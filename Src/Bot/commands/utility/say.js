const { Command } = require("../../../Lib");

module.exports = class SayCommand extends Command {
  constructor() {
    super("say", {
      description: "Make an announcement in the server",
      perms: ["MENTION_EVERYONE"],
      aliases: ["announce"],
      botPerms: ["MENTION_EVERYONE"],
      usage: "[Channel Mention | ID] [everyone] <Message>",
    });
  }

  async run(message, args) {
    let channel =
      message.guild.channels.cache.get(args[0]) ||
      message.mentions.channels.first();
    if (!channel) {
      channel = message.channel;
      args.push("channel");
    }

    let _message =
      args[1].toLowerCase() === "everyone"
        ? args.slice(2).join(" ")
        : args.slice(1).join(" ");

    let embed = message.embed
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle("Announcement")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(_message);

    try {
      await channel.send(
        args[1].toLowerCase() === "everyone" ? "@everyone" : "",
        embed
      );
    } catch (e) {
      message.sm(
        `Make sure I have permission to send messages in that channel!`
      );
    }
    await message.delete().catch();
  }
};
