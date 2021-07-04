let questions = require('../questions.json')
const { writeFile } = require('fs')

module.exports = class QuestionService {
	updateQuestions(questionList) {
		if (!questionList) return

		questions = questions.filter((q) => q.videoId != questionList[0].videoId)
		questions.push(...questionList)

		writeFile('src/questions.json', JSON.stringify(questions), (error) => error && console.error(error))
	}

	getQuestionsByPage(pageNumber, count) {
		return questions.slice(pageNumber * count, pageNumber * count + count)
	}

	getQuestionById(id) {
		return questions.find((q) => q.id == id)
	}

	getQuestionCount() {
		return questions.length || 0
	}
}
