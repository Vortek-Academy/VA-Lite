module.exports = (bot, app, req, res) => {
  res.json({ commands: bot.commands.array() });
};
