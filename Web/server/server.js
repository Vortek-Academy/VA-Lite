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
      app[type](`/${route}`, handler.bind(null, bot, app));
    }
  });

  app.get("*", (req, res) => {
    res.status(403);
    res.json({ code: 403, message: "You are not allowed to call this api" });
  });

  app.listen(3000, () => console.log("Server started successfully!"));
};
