const QuestionService = require('../services/question')
const DisTube = require('distube')

const questionService = new QuestionService()

module.exports = {
	name: 'dinle',
	description: 'Ses kanalında sorunun yanıtını ses olarak çalar.',
	guildOnly: true,
	args: true,
	usage: '<soru kimliği>',
	async run(message, args) {
		const questionId = args[0]
		const question = questionService.getQuestionById(questionId)

		if (!question) {
			return message.reply('soru bulunamadı!')
		}
		if (!message.member.voice.channel) {
			return message.reply('bu komutu çalıştırabilmek için bir ses kanalında olmalısın!')
		}

		const distube = new DisTube(message.client, { leaveOnFinish: true })

		distube.on('error', (error) => console.error(error))
		distube.on('empty', async (message) => {
			await message.member.voice.channel.leave()
		})

		const startTimeInMs = question.time.start.minute * 60000 + question.time.start.second * 1000

		await distube.play(message, `https://www.youtube.com/watch?v=${question.videoId}`)

		distube.seek(message, startTimeInMs)

		if (question.time.end.minute) {
			const endTimeInMs = question.time.end.minute * 60000 + question.time.end.second * 1000

			setTimeout(async () => {
				distube.stop(message)
				await message.member.voice.channel.leave()
			}, endTimeInMs - startTimeInMs)
		} else {
			message.reply('bu sorunun bitiş süresi bulunamadı. Ses bitene kadar çalmaya devam edecek.')
		}
	}
}
