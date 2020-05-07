require('dotenv').config({
	path: '../../.env'
});
const { Bot } = require('../Lib');
const config = require('../../config.json');

const bot = new Bot(config[process.env.TYPE].token);
bot.load();
