const config = require('../../config.json');

module.exports = class Config {
	constructor(type) {
		this.config = config[type];
	}

	get(locale = 'token') {
		return this.config[locale];
	}
};
