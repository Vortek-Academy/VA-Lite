const { Command } = require("../../../Lib");

module.exports = class InfoCommand extends Command {
  constructor() {
    super("info", {
      description: "Bot link and other information",
    });
  }

  async run(message, args) {
    let Embed = message.embed
      .setAuthor(this.bot.user.username, this.bot.user.displayAvatarURL())
      .setColor(this.bot.hex);

    await message.channel.send(Embed);
  }
};

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}h ${minutes}m ${seconds}sec`;
}
