const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config')

module.exports = {
	name: 'yardım',
	description: 'Tüm komutları listeler.',
	usage: '<komut adı>',
	run(message, args) {
		const { commands } = message.client
		const messages = []

		const embed = new MessageEmbed().setColor('#0099ff')

		if (!args.length) {
			commands.forEach((command) => {
				messages.push(`\`${prefix}${command.name} ${command.usage ? command.usage : ''}\``)
			})

			embed
				.setColor('#ffffff')
				.setDescription(`Spesifik bir komut hakkında yardım için: \`${prefix}${this.name} <komut adı>\``)
				.addFields({ name: 'Tüm komutlarım:', value: messages })

			return message.channel.send(embed)
		}

		const name = args[0].toLowerCase()
		const command = commands.get(name)

		if (!command) {
			return message.reply('böyle bir komutum yok!')
		}

		messages.push(`**Adı:** ${command.name}`)

		if (command.description) messages.push(`**Açıklaması:** ${command.description}`)
		if (command.usage) messages.push(`**Kullanımı:** \`${prefix}${command.name} ${command.usage}\``)

		embed.addFields({ name: 'Komut bilgileri:', value: messages })

		message.channel.send(embed)
	}
}
