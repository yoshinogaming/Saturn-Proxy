const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Commands Menu`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setDescription(`Invite me! ➔ [click here](https://discord.com/oauth2/authorize?client_id=848751663056814080&permissions=1544014960&scope=bot)!\nVote ➔ [click here](https://top.gg/bot/848751663056814080/vote)!`)
    .addField(`${emojis.info} Information`, "`bot-info` | `weather` | `corona` | `anime` | `docs`")
    .addField(`${emojis.mod} Moderation`, "`nuke` | `warn` | `warns` | `reset-warn`")
    .addField(`${emojis.gift} Giveaways`, "`start` | `reroll` | `end`")
    .addField(`${emojis.support} Support`, "`invite` | `vote`")
    .addField(`${emojis.staff} Utility`, "`afk` | `ping`")
    .addField(`${emojis.image} Image`, "`hitler` | `delete` | `clyde` | `trash` | `shit` | `ohno` | `rip`")
    .addField(`${emojis.star} Fun`, "`gender` | `eject` | `howgay` | `rps`")
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
};
