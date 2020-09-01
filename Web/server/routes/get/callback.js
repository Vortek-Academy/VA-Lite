module.exports = (bot, app, req, res) => {
  const { code } = req.query;
  if (!code) {
    res.send({ success: false, message: "Code not found." });
    return;
  }
  bot.oauth2
    .tokenRequest({
      code: code,
      scope: "identify guilds",
      grantType: "authorization_code",
    })
    .then((token) => {
      if (!token || !token.access_token) {
        res.send({
          success: false,
          message: "Did not receive access token.",
        });
        return;
      }

      res.redirect(
        `${
          bot.config.type === "production"
            ? bot.config.get("api")
            : "http://localhost:8080"
        }/?access_token=${token.access_token}&refresh_token=${
          token.refresh_token
        }`
      );
    })
    .catch(() =>
      res.redirect(
        bot.oauth2.generateAuthUrl({ scope: ["identify", "guilds"] })
      )
    );
};
