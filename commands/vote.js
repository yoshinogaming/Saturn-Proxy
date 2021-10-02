const config = require("../config.json")
const Discord = require("discord.js")
const disbut = require('discord-buttons');
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    let btn = new disbut.MessageButton()
    .setEmoji("855704030177263616")
    .setLabel('Click Here!')
    .setStyle('url')
    .setURL('https://top.gg/bot/848751663056814080/vote');
    

    message.channel.send('Vote me!', btn);
}
