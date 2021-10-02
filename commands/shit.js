const Discord = require("discord.js");
const Canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    const avatar = message.mentions.users.first() || message.author;

    let image = await Canvacord.Canvacord.shit(avatar.displayAvatarURL({ format: 'png' }));
    let attachment = new Discord.MessageAttachment(image, "Shit.png");
    message.channel.send(attachment);
}