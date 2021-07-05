const QuestionService = require('../services/question')
const DisTube = require('distube')

const questionService = new QuestionService()
let distubeInstance = null
let sharedMessage = null

module.exports = {
	name: 'dinle',
	description: 'Ses kanalında sorunun yanıtını ses olarak çalar.',
	guildOnly: true,
	args: true,
	usage: '<soru kimliği>',
	async run(message, args) {
		sharedMessage = message
		const questionId = args[0]
		const question = questionService.getQuestionById(questionId)

		if (!question) {
			return message.reply('soru bulunamadı!')
		}
		if (!message.member.voice.channel) {
			return message.reply('bu komutu çalıştırabilmek için bir ses kanalında olmalısın!')
		}
		if (!distubeInstance) {
			distubeInstance = new DisTube(message.client, { leaveOnFinish: true })
		}

		distubeInstance.on('error', () => {})
		distubeInstance.on('empty', async (message) => {
			await message.member.voice.channel.leave()
		})

		const startTimeInMs = question.time.start.minute * 60000 + question.time.start.second * 1000

		await distubeInstance.play(message, `https://www.youtube.com/watch?v=${question.videoId}`)

		distubeInstance.seek(message, startTimeInMs)

		if (question.time.end.minute) {
			const endTimeInMs = question.time.end.minute * 60000 + question.time.end.second * 1000

			setTimeout(async () => {
				distubeInstance.stop(message)
				await message.member.voice.channel.leave()
			}, endTimeInMs - startTimeInMs)
		} else {
			message.reply('bu sorunun bitiş süresi bulunamadı. Ses bitene kadar çalmaya devam edecek.')
		}
	}
}

exports.listen = { distubeInstance, sharedMessage }
