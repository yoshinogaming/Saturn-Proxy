const config = require("../config.json")
const Discord = require("discord.js")
const disbut = require('discord-buttons');

exports.run = async (client, message, args) => {
    let btn = new disbut.MessageButton()
    .setLabel('Click Here (Coming Soon)!')
    .setStyle('url')
    .setURL('https://top.gg/bot/848751663056814080/vote');
    

    message.channel.send('Vote me!', btn);
}
