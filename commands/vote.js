const config = require("../config.json")
const Discord = require("discord.js")
// const disbut = require('discord-buttons');
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addField(`Vote me!`, `[Click here!](https://top.gg/bot/848751663056814080/vote)`)

    message.channel.send(embed);
}
