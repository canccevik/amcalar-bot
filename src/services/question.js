let questions = require('../questions.json')
const { writeFile } = require('fs')

module.exports = class QuestionService {
	updateQuestions(questionList) {
		if (!questionList) return

		questions = questions.filter((q) => q.videoId != questionList[0].videoId)
		questions.push(...questionList)

		writeFile('src/questions.json', JSON.stringify(questions), (error) => error && console.error(error))
	}
}
