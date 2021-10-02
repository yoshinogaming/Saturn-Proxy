const config = require("../config.json");
const Discord = require("discord.js");
const Canvacord = require("canvacord");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    const avatar = message.mentions.users.first() || message.author;

    let image = await Canvacord.Canvacord.trash(avatar.displayAvatarURL({ format: 'png' }));
    let attachment = new Discord.MessageAttachment(image, "Trash.png");
    message.channel.send(attachment);
}