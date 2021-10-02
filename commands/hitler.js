const Discord = require("discord.js");
const config = require("../config.json");
const emojis = require("../emoji.json");
const Canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    const avatar = message.mentions.users.first() || message.author;

    let image = await Canvacord.Canvacord.hitler(avatar.displayAvatarURL({ format: 'png' }));
    let attachment = new Discord.MessageAttachment(image, "Hitler.png");
    message.channel.send(attachment);
}