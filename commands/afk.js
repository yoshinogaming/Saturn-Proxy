const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    if (message.deletable) {
        message.delete({ timeout: 10000 });
    }

    let args2 = message.content.split(" ");
    let reason = args2.slice(1).join(" ");

    const prefix = config.prefix;

    const status = new db.table("AFKs");
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed()

    if (!afk) {
        embed.addField(`${emojis.yes} **${message.author.tag}** is now AFK!`, `Reason: \`${reason || "AFK!"}\``)
        embed.setColor(config.color)
        embed.setTimestamp()
        embed.setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

        status.set(message.author.id, reason || `AFK`);
    } else {
        embed.setDescription("You are no longer AFK.");
        status.delete(message.author.id);
    }

    message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
}