const config = require("../../../config.json");
require("dotenv").config({
  path: __dirname + "/../../../.env",
});

module.exports = class Config {
  constructor() {
    this.config = config[process.env.TYPE];
  }

  get(locale = "token") {
    return this.config[locale];
  }
};
