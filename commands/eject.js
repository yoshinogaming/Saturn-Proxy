const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const color = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
    const colors = color[Math.floor(Math.random() * color.length)];

    const sus = ["true", "false"]
    const suss = sus[Math.floor(Math.random() * sus.length)];

    let member = message.mentions.users.first() || message.author;

    const data = await fetch(`https://vacefron.nl/api//ejected?name=${member.username}&impostor=${suss}&crewmate=${colors}`) 
    
    const embed = new Discord.MessageEmbed()
    .addField(`${emojis.info} Ejected!`, `Oh no.. **${member.tag}** got ejected!`)
    .setImage(`${data.url}`)
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    
    message.channel.send(embed);
}