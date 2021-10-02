const config = require("../config.json");
const Discord = require("discord.js");
const Canvacord = require("canvacord");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const text = message.content.split(" ").slice(1).join(" ");
    if (!text) return message.channel.send(`${emojis.no} Try again with a text!\nExample: \`${config.prefix}ohno 1+1 is 11`)


    let image = await Canvacord.Canvacord.ohno(text);
    let attachment = new Discord.MessageAttachment(image, "Oh_no.png");
    message.channel.send(attachment);
}