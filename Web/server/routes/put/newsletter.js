const raw = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz.-_";
const cache = [];
const Newsletter = require("../../../../Src/Lib/models/Newsletters");

module.exports = (bot, app, req, res) => {
  if (req.header("Get-Auth") === "true") {
    const token = Array.from(
      { length: 32 },
      () => raw[Math.floor(Math.random() * raw.length)]
    ).join("");
    cache.push(token);
    res.json({ token });
    return;
  }

  if (!cache.includes(req.header("Auth"))) {
    res.send({
      success: false,
      message: "Invalid API key provided.",
    });
    return;
  }

  const { name, email } = req.query;
  if (!name || !email) {
    res.send({
      success: false,
      message: 'The "name" or "email" query string missing.',
    });
    return;
  }

  Newsletter.findOne({ email: email }).then((doc) => {
    if (doc) {
      res.send({
        status: 204,
        success: true,
        message: "User already subscribed.",
      });
      return;
    }

    new Newsletter({
      name: name,
      email: email,
    }).save();

    res.send({
      success: true,
    });
  });
};
