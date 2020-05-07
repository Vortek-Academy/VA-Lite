const { Structures } = require('discord.js');

module.exports = () =>
	Structures.extend(
		'User',
		(User) =>
			class extends User {
				constructor() {
					super(...arguments);
				}
			}
	);
