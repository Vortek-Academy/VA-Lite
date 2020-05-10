const { Structures, MessageEmbed } = require("discord.js");

module.exports = () =>
  Structures.extend(
    "Message",
    (Message) =>
      class extends Message {
        sm(content = "No content") {
          return this.channel.send(new MessageEmbed().setDescription(content));
        }

        get embed() {
          return new MessageEmbed()
            .setFooter(
              this.client.user.username,
              this.client.user.displayAvatarURL()
            )
            .setTimestamp();
        }
      }
  );
