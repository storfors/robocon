#!/usr/bin/node
const { token, voiceRoleName } = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('voiceStateUpdate', async (_, newState) => {
	// Get the role we want to apply
	var role = newState.guild.roles.cache.find(r => r.name === voiceRoleName);
	
	try{
		// If the new state "has" a voice channel, apply the role
		if (newState.channel) {
			await newState.member.roles.add(role);
		}
		else {
			await newState.member.roles.remove(role);
		}
	}
	catch (error) {
		console.log(error)
	}
});

client.login(token);
