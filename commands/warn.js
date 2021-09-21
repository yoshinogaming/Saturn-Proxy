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

    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");
    let prefix = conf.prefix;
    let args1 = message.content.slice(prefix.length).trim().split(/ +/g);
    let reason1 = args1.slice(2).join(" ");
    let user = message.mentions.users.first();

    if (!user) return message.channel.send(`${emojis.no} You have to mention the user first!\nExample: \`${config.prefix}warn @${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator}\``);

    let warnings = db.get(`warn_${message.guild.id}_${user.id}`)

    if (user.id === client.user.id) return message.channel.send(`${emojis.no} You can't warn a bot!`);

    if (user.id === message.author.id) return message.channel.send(`${emojis.no} You can't warn yourself!`);

    if (!reason1) return message.channel.send(`${emojis.no} You have to type a reason!\nExample: \`${config.prefix}warn @${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator} Spam\``);

    const embed = new discord.MessageEmbed()
        .setFooter(message.guild.name, message.guild.iconURL({ size: 2048 }))
   		.addField(`${emojis.bell} You got warned!`, `Moderator: **${message.author.tag}**\nReason: \`${reason1}\``)
        .setColor(config.color)
        .setTimestamp()

    if (warnings === null) {
        db.add(`warning_${message.guild.id}_${user.id}`, 1)
        db.set(`latestwarn.${user.id}`, reason1)
        const well4 = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTimestamp()
        	.addField(`${emojis.yes} Successfully Warned!`, `**${user.tag}** has been warned!\nReason \`${reason1}\``)
            .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        user.send(embed).then(() => message.channel.send(well4)).catch(() => message.channel.send(`${emojis.no} | Something wrong.. try again.`));
    }
}
