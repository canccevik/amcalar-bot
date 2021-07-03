const { Client, Collection } = require('discord.js')
const { botToken } = require('./config')
const { readdirSync } = require('fs')
const { join } = require('path')
const initServer = require('./server')

initServer()

const client = new Client()
client.commands = new Collection()

const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'))

commandFiles.forEach((file) => {
	const command = require(`./commands/${file}`)

	client.commands.set(command.name, command)
})

const eventFiles = readdirSync(join(__dirname, 'events')).filter((file) => file.endsWith('.js'))

eventFiles.forEach((file) => {
	const event = require(`./events/${file}`)

	if (event.once) {
		return client.once(event.name, (...args) => event.run(...args, client))
	}
	client.on(event.name, (...args) => event.run(...args, client))
})

client.login(botToken)
