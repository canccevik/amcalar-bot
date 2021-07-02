const { prefix } = require('../config')

module.exports = {
	name: 'message',
	run(message, client) {
		if (!message.content.startsWith(prefix) || message.author.bot) return

		const args = message.content.slice(prefix.length).trim().split(' ')
		const commandName = args.shift().toLowerCase()

		if (!client.commands.has(commandName)) return

		const command = client.commands.get(commandName)

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply('Bu komutu burada çalıştıramam!')
		}

		if (command.args && !args.length) {
			let reply = 'herhangi bir argüman girmediniz!'

			if (command.usage) {
				reply += `\nKomut şu şekilde kullanılır: \`${prefix}${command.name} ${command.usage}\``
			}
			return message.reply(reply)
		}

		try {
			command.run(message, args)
		} catch (error) {
			console.error(error)
		}
	}
}
