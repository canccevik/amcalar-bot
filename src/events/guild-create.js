const createQuestionsFile = require('../helpers/create-questions-file')

module.exports = {
	name: 'guildCreate',
	async run(guild, client) {
		await createQuestionsFile()
	}
}
