const config = require("../config.json");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const Dev = `${client.users.cache.get(config.owner).username}#${client.users.cache.get(config.owner).discriminator}`

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Help Menu`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setDescription(`**Saturn Proxy** is a cool Discord Bot, created by **${Dev}** in **May 31, 2021**.\n**Saturn Proxy** mission is to **help** people manage their server, telling a **information** and bringing **fun** to others.`)
    .addField(`Get Started`, `To start using **Saturn Proxy** type **${client.config.prefix}commands**.\nto start a Giveaway type \n\`${client.config.prefix}start <#Channel)> <Duration> [Winner] [Prize]\``, true)
    .addField(`Please Note`, "We will add a **awesome features** soon! so be ready, and get **Saturn Proxy** on your server! and don't forget to vote Saturn Proxy at **Top.gg**!", true)
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
};
