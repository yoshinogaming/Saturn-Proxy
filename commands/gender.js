const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const lol = ["male", "female"]
    const random = lol[Math.floor(Math.random() * lol.length)];

    let userArray = message.content.split(" ");;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

    const embed = new Discord.MessageEmbed()
    .addField(`${emojis.yes} Real Gender System!`, `**${member.user.tag}** real gender is **${random}**.`)
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    
    message.channel.send(embed);
}