const db = require(`quick.db`);
const discord = require(`discord.js`);
const conf = require(`../config.json`);
const config = require(`../config.json`);
const Discord = require(`discord.js`);
const emojis  = require('../emoji.json');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
        return message.channel.send(`${emojis.no} You need **Manage_Guild** permission to run this command!`);
    }

    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`${emojis.no} You have to mention the user first!\nExample: \`${config.prefix}warns @${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator}\``);

    let warnings = db.get(`warning_${message.guild.id}_${user.id}`)

    if(warnings === null) warnings = 0;
    let latest = db.get(`latestwarn.${user.id}`);
    if (latest === undefined) latest = 'No latest warn.'

    const embed = new discord.MessageEmbed()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .addField(`${emojis.yes} Warning List`, `**${user.tag}** have \`${warnings}\` warning(s)\nLatest warning: \`${latest}\``)
    .setTimestamp()
    .setColor(config.color)

    message.channel.send(embed).catch(() => message.channel.send(`${emojis.no} Something wrong.. try again.`));
}
