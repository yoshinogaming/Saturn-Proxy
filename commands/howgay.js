const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const random = Math.floor(Math.random() * 101);

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

    if (member.user.id === config.owner) {
        const owner = new Discord.MessageEmbed()
            .addField(`${emojis.yes} Are you a gay?`, `**${member.user.tag}** is **0%** gay!`)
            .setTimestamp()
            .setColor(config.color)
            .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        return message.channel.send(owner);
    }

    const embed = new Discord.MessageEmbed()
        .addField(`${emojis.yes} Are you a gay?`, `**${member.user.tag}** is **${random}%** gay!`)
        .setTimestamp()
        .setColor(config.color)
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    return message.channel.send(embed);
};
