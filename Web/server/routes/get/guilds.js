const { Permissions } = require("discord.js");
module.exports = (bot, app, req, res) => {
  if (!req.query.access_token) return res.json({ success: false });

  if (req.query.id) {
    const guild = bot.guilds.cache.get(req.query.id);
    if (!guild) return res.send({ success: false });
    if (!guild.db) guild.setDB().catch();

    return res.send({
      success: true,
      guild: {
        name: guild.name,
        id: guild.id,
        database: guild.database,
        iconURL: guild.iconURL({ dynamic: true }),
        channels: guild.channels.cache.array(),
        memberSize: guild.members.cache.size,
        channelSize: guild.channels.cache.size,
        rolesSize: guild.roles.cache.size,
      },
    });
  }

  bot.oauth2
    .getUserGuilds(req.query.access_token)
    .then((data) => {
      let guilds = data
        .filter((guild) =>
          new Permissions(guild.permissions).has("MANAGE_GUILD", true)
        )
        .map((guild) => ({
          ...guild,
          hasBot: bot.guilds.cache.has(guild.id),
        }));
      res.send({ success: true, guilds });
    })
    .catch(() => res.send({ success: false }));
};
