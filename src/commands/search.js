const { MessageEmbed } = require('discord.js')
const QuestionService = require('../services/question')
const { prefix } = require('../config')

const questionService = new QuestionService()

module.exports = {
	name: 'ara',
	description: 'Soruları arama yaparak listeler.',
	args: true,
	usage: '<aranacak metin> <sayfa numarası>',
	run(message, args) {
		const searchText = args.slice(0, args.length - 1).join(' ')
		const pageNumber = parseInt(args[args.length - 1]) - 1

		const { questions, totalResultCount } = questionService.searchByPage(pageNumber, 10, searchText)

		let reply = questions.map((q, i) => {
			return {
				name: `**${pageNumber * 10 + i + 1}.** ${q.title}`,
				value: `**Kimlik:** ${q.id}`
			}
		})

		if (questions.length == 0) {
			reply = { name: 'Sonuçlar:', value: 'Sonuç bulunamadı.' }
		}

		const embed = new MessageEmbed().setColor('#ffffff').addFields(reply)

		if (questions.length > 0) {
			embed.setTitle(`İzlemek için: \`${prefix}izle <soru kimliği>\`\nDinlemek için: \`${prefix}dinle <soru kimliği>\``)
			embed.setFooter(`${totalResultCount} soru içerisinden ${pageNumber * 10 + 1}-${pageNumber * 10 + 10} aralığı gösteriliyor.`)
		}

		message.reply(embed)
	}
}
