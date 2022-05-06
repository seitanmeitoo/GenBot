// Dependencies
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const CatLoggr = require('cat-loggr');
const client = new Client({ intents: 4609 });
const log = new CatLoggr();

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

if (config.debug === true) client.on('debug', stream => log.debug(stream)); 
client.on('warn', message => log.warn(message));
client.on('error', error => log.error(error));

client.login(config.token);