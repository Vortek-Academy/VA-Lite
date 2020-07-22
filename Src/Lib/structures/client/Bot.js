const { Client, Collection } = require("discord.js");
const Handler = require("./Handler");
const Config = require("../Config");
const mongoose = require("mongoose");
require("../extended/Message")();
require("../extended/Guild")();

module.exports = class Bot extends Client {
  constructor(token) {
    // Call super and login the bot
    super();

    // Loading commands and making a new handler instance
    this.config = new Config();
    this.handler = new Handler(this);
    this.commands = new Collection();
  }

  async load(
    { commands, events } = {
      commands: __dirname + "/../../../Bot/commands",
      events: __dirname + "/../../../Bot/events",
    }
  ) {
    // Load the events and commands
    this.handler.loadCommand(commands);
    this.handler.loadEvents(events);
    await mongoose.connect(this.config.get("uri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB database!");
    super
      .login(this.config.get())
      .then(() => console.log(`${this.user.username} is now online!`))
      .catch(console.error);
  }
};
