require('dotenv').config()

module.exports = {
	botToken: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX || '!'
}
