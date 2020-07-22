const { Client, Collection } = require("discord.js");
const Handler = require("./Handler");
const Confg = require("../Config");
require("../extended/Message")();
require("../extended/Guild")();

module.exports = class Bot extends Client {
  constructor(token) {
    // Call super and login the bot
    super();
    super
      .login(token)
      .then(() => console.log(`${this.user.username} is now online!`))
      .catch(console.error);

    // Loading commands and making a new handler instance
    this.config = new Confg();
    this.handler = new Handler(this);
    this.commands = new Collection();
  }

  load(
    { commands, events } = {
      commands: __dirname + "/../../../Bot/commands",
      events: __dirname + "/../../../Bot/events",
    }
  ) {
    // Load the events and commands
    this.handler.loadCommand(commands);
    this.handler.loadEvents(events);
  }
};
