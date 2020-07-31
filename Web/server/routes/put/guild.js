module.exports = (bot, app, req, res) => {
  if (!req.query.id || !req.query.access_token)
    return res.send({
      success: false,
    });
  const guild = bot.guilds.cache.get(req.query.id);
  if (!guild)
    return res.send({
      success: false,
    });

  bot.oauth2
    .getUser(req.query.access_token)
    .then((user) => {
      if (!user || !guild.members.cache.has(user.id))
        return res.send({
          success: false,
        });

      const mem = guild.members.cache.get(user.id);
      if (
        !mem.hasPermission("MANAGE_GUILD", {
          checkAdmin: true,
          checkOwner: true,
        })
      )
        return res.send({ success: false });

      if (req.query.logChannel) {
        if (!guild.channels.cache.has(req.query.logChannel))
          return res.send({ success: false });
        guild.db.moderationChannel = req.query.logChannel;
      }
      if (req.query.prefix) guild.db.prefix = req.query.prefix;

      guild.db.save();
      res.send({ success: true });
    })
    .catch(() => res.send({ success: false }));
};
