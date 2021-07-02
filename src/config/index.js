require('dotenv').config()

module.exports = {
	botToken: process.env.BOT_TOKEN,
	prefix: process.env.PREFIX || '!',
	channelId: process.env.YT_CHANNEL_ID,
	ytApiKey: process.env.YT_API_KEY
}
