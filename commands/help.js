const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const Dev = `${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator}`

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Help Menu`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setDescription(`**Saturn Proxy** is a cool Discord Bot, created by **${Dev}** in **May 31, 2021**. **Saturn Proxy** mission is to **help** people manage their server, telling a **information** and bringing **fun** to others.`)
    .addField(`${emojis.star} Get Started`, `To start using **Saturn Proxy** type **${client.config.prefix}commands**.\nto start a Giveaway type \n\`${client.config.prefix}start <#Channel> <Duration> [Winner] [Prize]\``, true)
    .addField(`${emojis.bell} Please Note`, "We will add a **awesome features** soon! so be ready, and get **Saturn Proxy** on your server! and don't forget to vote Saturn Proxy at **Top.gg**!", true)
    .addField(`${emojis.staff} ChangeLogs (10/2/2021)`, `**[!]** We moved from Vultr.com to Microsoft Azure.\n**[+]** Added delete command.`)
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
};
