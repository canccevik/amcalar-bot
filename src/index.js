const { Client, Collection } = require('discord.js')
const { botToken, prefix } = require('./config')
const { readdirSync } = require('fs')
const { join } = require('path')

const client = new Client()
client.commands = new Collection()

const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'))

commandFiles.forEach((file) => {
	const command = require(`./commands/${file}`)

	client.commands.set(command.name, command)
})

client.on('message', (message) => {
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
})

client.login(botToken)
