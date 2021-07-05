const createQuestionsFile = require('../helpers/create-questions-file')
const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config')

module.exports = {
	name: 'guildCreate',
	async run(guild, client) {
		await createQuestionsFile()

		const generalChannel = guild.channels.cache.filter((c) => c.type === 'text').find((x) => x.position === 0)

		const embed = new MessageEmbed()
			.setColor('#ffffff')
			.setTitle('Herkese merhaba 😊')
			.setDescription(
				`Kısaca neler yapabilirim?\n
				Armağan Amcalar'ın YouTube kanalındaki soru-cevap videolarından istediğiniz soruyu arayabilmenizi, istediğiniz sorunun cevabını bir ses kanalında dinleyebilmenizi ve bir metin kanalında izleyebilmenizi sağlayabilirim.\n
				Benden faydalanmaya \`${prefix}yardım\` komutu ile başlayabilirsiniz.`
			)
			.setThumbnail(client.user.avatarURL())
			.setFooter('Bu bot Can Çevik tarafından geliştirilmiştir.')

		generalChannel.send(embed)
	}
}
