module.exports = (bot, app, req, res) => {
  const { access_token } = req.query;

  if (access_token) {
    bot.oauth2
      .getUser(access_token)
      .then((user) => {
        res.send({ success: true, user });
      })
      .catch(() => res.send({ success: false }));
  }
};
