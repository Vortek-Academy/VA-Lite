const { Structures } = require("discord.js");
const { GuildModel } = require("../../");
const { prefix } = require("../../../config.json");

module.exports = () =>
  Structures.extend(
    "Guild",
    (Guild) =>
      class extends Guild {
        constructor() {
          super(...arguments);
          this.database;
          this.setDB();
        }

        async setDB() {
          await GuildModel.findOne({ id: this.id }).then((guild) => {
            this.database =
              guild ||
              new GuildModel({
                id: this.id,
                prefix: prefix,
                moderationChannel: null,
                moderation: [],
              });
          });
        }

        get db() {
          return this.database;
        }
      }
  );
