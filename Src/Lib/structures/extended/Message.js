const { Structures, MessageEmbed } = require("discord.js");

module.exports = () =>
  Structures.extend(
    "Message",
    (Message) =>
      class extends Message {
        sm(content = "No content") {
          return this.channel.send(new MessageEmbed().setDescription(content));
        }
        findMember(member) {
          return this.mentions.members.first() || this.guild.members.cache.find(m => m.displayName === member || m.id === member) || null;
        }

        position(target) {
          return this.member.roles.highest.position > this.findMember(target).roles.highest.position
        }

        findChannels(channel) {
          return this.mentions.channels.first() || this.guild.channels.cache.find(m => m.name === channel || m.id === channel) || null;
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
