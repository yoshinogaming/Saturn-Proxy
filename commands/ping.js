const config = require("../config.json")
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    try {
        const m = await message.channel.send("Pong!"); // Make sure the async is written, top of the client.on("message", ...)
        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(config.color)
        .setDescription(`Latency: **${m.createdTimestamp -  message.createdTimestamp}ms**\nAPI: **${Math.floor(client.ws.ping)}ms**`)
        return message.channel.send(embed);
      } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
      }
}
