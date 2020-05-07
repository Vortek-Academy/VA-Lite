module.exports = class Command {
	constructor(
		name,
		options = {
			aliases: [],
			description: 'None',
			usage: 'None',
			examples: [],
			perms: [],
			botPerms: []
		}
	) {
		this.name = options.name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'None';
		this.usage = options.usage || 'None';
		this.examples = options.examples || [];
		this.perms = options.perms || [];
		this.botPerms = options.botPerms || [];
	}

	// Send this if there is no run function
	run(message) {
		message.sm(`This command is under development!`);
	}
};
