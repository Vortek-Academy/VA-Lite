const { Structures } = require('discord.js');

module.exports = () =>
	Structures.extend(
		'Guild',
		(Guild) =>
			class extends Guild {
				constructor() {
					super(...arguments);
				}
			}
	);
