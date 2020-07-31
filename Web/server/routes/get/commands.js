module.exports = (bot, app, req, res) => {
  const commandArr = bot.commands.array();
  res.send({
    commands: commandArr.map((c) => {
      return {
        name: c.name[0].toUpperCase() + c.name.slice(1),
        cat: c.category,
        description: c.description,
        usage: `!${c.name} ${c.usage}`,
      };
    }),
  });
};
