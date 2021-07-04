const QuestionService = require('../services/question')

const questionService = new QuestionService()

module.exports = {
	name: 'izle',
	description: 'Sorunun yanıtının YouTube izleme linkini gönderir.',
	args: true,
	usage: '<soru kimliği>',
	run(message, args) {
		const questionId = args[0]
		const question = questionService.getQuestionById(questionId)

		let reply = question
			? `https://www.youtube.com/watch?v=${question.videoId}&t=${question.time.start.minute}m${question.time.start.second}s`
			: 'soru bulunamadı.'

		message.reply(reply)
	}
}
