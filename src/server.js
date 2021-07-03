const app = require('express')()
const server = require('http').createServer(app)
const { channelId, serverUrl, ytApiKey, port } = require('./config')
const YouTubeNotifier = require('youtube-notification')
const YouTubeService = require('./services/youtube')
const QuestionService = require('./services/question')

const ytService = new YouTubeService({ channelId, ytApiKey })
const questionService = new QuestionService()

module.exports = () => {
	server.listen(port)

	const notifier = new YouTubeNotifier({
		hubCallback: `${serverUrl}/notifier`
	})

	notifier.setup()

	notifier.on('notified', async (data) => {
		const videoId = data.video.id
		const questions = await ytService.qetQuestions([videoId])

		questionService.updateQuestions(questions)
	})

	notifier.subscribe(channelId)

	app.use('/notifier', notifier.listener())
}
