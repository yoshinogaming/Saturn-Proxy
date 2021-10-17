const config = require("../config.json")
const Discord = require("discord.js")
// const disbut = require('discord-buttons');

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .addField(`Invite me!`, `[Click here!](https://discord.com/oauth2/authorize?client_id=848751663056814080&permissions=1544014960&scope=bot)`)

    message.channel.send(embed);
}
