const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");
const { MessageButton, MessageActionRow } = require('discord-buttons');

exports.run = async (client, message, args) => {
    return message.channel.send(`${emojis.no} Sorry but this command is under development, please try again later.`)
}