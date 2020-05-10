require("dotenv").config({
  path: "../../.env",
});
const { Bot } = require("../Lib");
const config = require("../../config.json");
const { connect } = require("mongoose");

connect(
  config[process.env.TYPE].uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB database!");
  }
);

const bot = new Bot(config[process.env.TYPE].token);
bot.load();
