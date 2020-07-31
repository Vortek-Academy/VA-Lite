module.exports = class Command {
  constructor(
    name,
    options = {
      aliases: [],
      description: "None",
      usage: "None",
      perms: [],
      botPerms: [],
    }
  ) {
    this.name = name;
    this.aliases = options.aliases || [];
    this.description = options.description || "No description yet!";
    this.usage = options.usage || "None";
    this.perms = options.perms || [];
    this.botPerms = options.botPerms || [];
  }

  // Send this if there is no run function
  run(message) {
    message.sm(`This command is under development!`);
  }
};
