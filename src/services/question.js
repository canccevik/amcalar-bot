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

	searchByPage(pageNumber, count, searchText) {
		const results = questions.filter((q) => q.title.toLowerCase().includes(searchText.toLowerCase()))
		const filteredResults = results.slice(pageNumber * count, pageNumber * count + count)

		return {
			totalResultCount: results.length || 0,
			questions: filteredResults
		}
	}
}
