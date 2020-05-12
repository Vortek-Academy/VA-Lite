const { Command } = require("../../../Lib");

module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["h"],
      description: "Shows command usage and function",
      usage: "[Command Name]",
    });
  }

  async run(message, args) {
    args[0]
      ? getCMD(this.bot, message, args[0].toLowerCase())
      : getAll(this.bot, message);
  }
};

function getAll(bot, message) {
  const helpEmbed = message.embed
    .setTitle("All Commands List")
    .setColor(bot.hex)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(
      `${message.guild.db.prefix}help [Command Name]`,
      bot.user.displayAvatarURL()
    );

  const command = (category) => {
    return bot.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => `\`${cmd.name}\``)
      .join(" | ");
  };
  const info = bot.commands
    .reduce(
      (acc, val) => (acc.includes(val.category) ? acc : [...acc, val.category]),
      []
    )
    .map((cat) => `**${cat[0].toUpperCase() + cat.slice(1)}**\n${command(cat)}`)
    .reduce((string, category) => string + "\n" + category);

  return message.channel.send(helpEmbed.setDescription(info));
}

function getCMD(bot, message, input) {
  const helpEmbed = message.embed
    .setTitle("Command Help And Info")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter(
      "Syntax: <> = Required | [] = Optional",
      bot.user.displayAvatarURL()
    );

  const command = bot.handler.getCommand(input);
  let info = `No info found for the command: ${input.toLowerCase()}!`;

  if (!command) return message.sm(info);

  if (command.name) info = `**Command Name:** \`${command.name}\``;
  if (command.aliases.length)
    info += `\n**Aliases:** ${command.aliases
      .map((a) => `\`${a}\``)
      .join(" | ")}`;
  if (command.description) info += `\n**Description:** ${command.description}`;
  if (command.perms.length)
    info += `\n**User Permissions:** ${command.perms
      .map((a) => `\`${a}\``)
      .join(" | ")}`;
  if (command.botPerms.length)
    info += `\n**Bot Permissions:** ${command.botPerms
      .map((a) => `\`${a}\``)
      .join(" | ")}`;
  if (command.usage) helpEmbed.addField("Usage", `**${command.usage}**`);

  return message.channel.send(helpEmbed.setDescription(info));
}
