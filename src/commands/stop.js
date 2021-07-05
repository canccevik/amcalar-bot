const { listen } = require('./listen')

module.exports = {
	name: 'durdur',
	description: 'Botun oynattığı sesi durdurur.',
	guildOnly: true,
	async run(message, args) {
		const inSameVoiceChannel = message.client.voice.connections.some((connection) => connection.channel.id === message.member.voice.channelID)

		if (!inSameVoiceChannel) {
			return message.reply('botu durdurabilmek için botla aynı ses kanalında olmalısın!')
		}

		const { distubeInstance, sharedMessage } = listen

		distubeInstance.stop(sharedMessage)
		await message.member.voice.channel.leave()
	}
}
