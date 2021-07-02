const axios = require('axios').default

module.exports = class YouTubeService {
	constructor({ ytApiKey, channelId }) {
		this.ytApiKey = ytApiKey
		this.channelId = channelId
	}

	async getVideoIdList() {
		const videoIdList = []
		let pageToken = null

		do {
			const { data } = await axios.get(
				`https://youtube.googleapis.com/youtube/v3/search?channelId=${this.channelId}&maxResults=1000&order=date&type=video&key=${this.ytApiKey}${
					pageToken ? `&pageToken=${pageToken}` : ''
				}`
			)

			const videoIds = data.items.map((item) => item.id.videoId)

			videoIdList.push(...videoIds)
			pageToken = data.nextPageToken
		} while (pageToken)

		return videoIdList
	}

	async qetQuestions(videoIdList) {
		const questions = []

		for (let i = 0; i < videoIdList.length; i += 49) {
			const idParameters = videoIdList.slice(i, i + 49).join('&id=')

			const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idParameters}&key=${this.ytApiKey}`)

			data.items.forEach((item) => {
				const pattern = /(.*?)\(([0-9]{2}):([0-9]{2})\)/gm
				const { description } = item.snippet
				const lines = [...description.matchAll(pattern)]

				lines.forEach((line, i) => {
					let title = line[1].trim()

					if (title.startsWith('-')) {
						title = title.slice(1).trim()
					}

					const start = { minute: line[2], second: line[3] }
					const end = lines[i + 1] ? { minute: lines[i + 1][2], second: lines[i + 1][3] } : {}

					questions.push({
						id: item.id,
						time: { start, end },
						title
					})
				})
			})
		}
		return questions
	}
}
