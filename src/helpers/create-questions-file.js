const YouTubeService = require('../services/youtube')
const { channelId, ytApiKey } = require('../config')
const { writeFile } = require('fs')

module.exports = async () => {
	const ytService = new YouTubeService({ ytApiKey, channelId })

	const videoIdList = await ytService.getVideoIdList()
	const questions = await ytService.qetQuestions(videoIdList)

	writeFile('src/questions.json', JSON.stringify(questions), (error) => error && console.error(error))
}
