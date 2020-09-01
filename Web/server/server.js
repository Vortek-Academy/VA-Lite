const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const { json } = require("body-parser");

module.exports = (bot) => {
  const app = express();
  app.use(json());
  app.use(cors());
  app.use(
    express.static(require("path").resolve(`${__dirname}/../client/dist/`))
  );
  app.set("views", `${__dirname}../client/dist/`);

  readdirSync(`${__dirname}/routes`).forEach((type) => {
    const routes = readdirSync(`${__dirname}/routes/${type}`)
      .filter((x) => x.endsWith(".js"))
      .map((x) => x.split(".")[0]);

    for (let route of routes) {
      const handler = require(`${__dirname}/routes/${type}/${route}`);
      app[type](`/api/${route}`, handler.bind(null, bot, app));
    }
  });

  app.get("/invite", (req, res) => {
    res.redirect(
      bot.config.type === "production"
        ? "https://discord.com/api/oauth2/authorize?client_id=662151947968577563&permissions=268954743&redirect_uri=https%3A%2F%2Fvalite.tech%2Fapi%2Fcallback&scope=bot"
        : "https://discord.com/oauth2/authorize?client_id=662151947968577563&permissions=8&scope=bot"
    );
  });

  app.get("*", (req, res) => {
    res.sendFile(
      require("path").resolve(__dirname + "/../client/dist/index.html")
    );
  });

  app.listen(3000, "localhost", () =>
    console.log("Server started successfully!")
  );
};
