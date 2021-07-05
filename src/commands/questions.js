const { MessageEmbed } = require('discord.js')
const QuestionService = require('../services/question')
const { prefix } = require('../config')

const questionService = new QuestionService()

module.exports = {
	name: 'sorular',
	description: 'Soruları sayfalar şeklinde listeler.',
	args: true,
	usage: '<sayfa numarası>',
	run(message, args) {
		const pageNumber = parseInt(args[0]) - 1
		const questions = questionService.getQuestionsByPage(pageNumber, 10)
		const totalQuestionCount = questionService.getQuestionCount()

		let reply = questions.map((q, i) => {
			return {
				name: `**${pageNumber * 10 + i + 1}.** ${q.title}`,
				value: `**Kimlik:** ${q.id}`
			}
		})

		if (!questions.length) {
			reply = { name: 'Sonuçlar:', value: 'Sonuç bulunamadı.' }
		}

		const embed = new MessageEmbed().setColor('#ffffff').addFields(reply)

		if (questions.length) {
			embed.setTitle(`İzlemek için: \`${prefix}izle <soru kimliği>\`\nDinlemek için: \`${prefix}dinle <soru kimliği>\``)
			embed.setFooter(`${totalQuestionCount} soru içerisinden ${pageNumber * 10 + 1}-${pageNumber * 10 + 10} aralığı gösteriliyor.`)
		}

		message.reply(embed)
	}
}
