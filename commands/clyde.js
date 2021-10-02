const config = require("../config.json");
const Discord = require("discord.js");
const Canvacord = require("canvacord");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const text = message.content.split(" ").slice(1).join(" ");
    if (!text) return message.channel.send(`${emojis.no} Try again with a text!\nExample: \`${config.prefix}clyde Your connection is bad lol!`)


    let image = await Canvacord.Canvacord.clyde(text);
    let attachment = new Discord.MessageAttachment(image, "Clyde.png");
    message.channel.send(attachment);
}