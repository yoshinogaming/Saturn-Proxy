const config = require("../config.json");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Commands Menu`, client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
    .setDescription(`Invite me! ➔ [click here](https://discord.com/oauth2/authorize?client_id=848751663056814080&permissions=1544014960&scope=bot)!\nVote ➔ [click here](https://top.gg/bot/848751663056814080/vote)!`)
    .addField(`Moderation`, "`nuke` | `warn` | `warns` | `reset-warn`")
    .addField(`Giveaways`, "`start` | `reroll` | `end`")
    .addField(`Support`, "`invite` | `vote`")
    .addField(`Other`, "`about` | `ping` | `link`")
    .addField(`Fun`, "`gender` | `eject` | `howgay`")
    .setTimestamp()
    .setColor(config.color)
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
};
