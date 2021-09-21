const db = require(`quick.db`);
const discord = require(`discord.js`);
const conf = require(`../config.json`);
const config = require(`../config.json`);
const Discord = require(`discord.js`);
const emojis = require('../emoji.json');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(`${emojis.no} You need **Manage_Guild** permission to run this command!`);
    }

    let user = message.mentions.users.first();
    if(!user) {
        return message.channel.send(`${emojis.no} You have to mention the user first!\nExample: \`${config.prefix}reset-warn @${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator}\``);
        }

    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    const well2 = new Discord.MessageEmbed()
    .setDescription(`${emojis.no} ${user.tag} do not have any warning!`)

if(warnings === null) {
    return message.channel.send(well2)
    }

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .addField(`${emojis.yes} Warning Reset!`, `**${user.tag}** warning(s) has been successfully reset!`)
    .setTimestamp()
    .setColor(config.color)

    db.delete(`warning_${message.guild.id}_${user.id}`)
    db.delete(`latestwarn.${user.id}`);
    message.channel.send(embed).catch(() => message.channel.send("Something wrong.. try again."))
    user.send(`${emojis.bell} Your warning(s) has been reset by \`${message.author.tag}\` from \`${message.guild.name}\``)

}
