module.exports = (bot, app, req, res) => {
  res.send({
    url: bot.oauth2.generateAuthUrl({ scope: ["identify", "guilds"] }),
  });
};
