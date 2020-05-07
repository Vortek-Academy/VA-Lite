const { Structures } = require('discord.js');

module.exports = () =>
	Structures.extend(
		'GuildMember',
		(GuildMember) =>
			class extends GuildMember {
				constructor() {
					super(...arguments);
				}
			}
	);
