const { Structures } = require("discord.js");
const { MemberModel } = require("../../");

module.exports = () =>
  Structures.extend(
    "GuildMember",
    (GuildMember) =>
      class extends GuildMember {
        constructor() {
          super(...arguments);
          this.database;
          this.setDB();
        }

        async setDB() {
          await MemberModel.findOne({ id: this.id, guild: this.guild.id }).then(
            (member) => {
              this.database =
                member ||
                new MemberModel({
                  id: this.id,
                  guild: this.guild.id,
                });
            }
          );
        }

        get db() {
          return this.database;
        }
      }
  );
