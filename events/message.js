const config = require("../config.json");
const ch = require("../channels.json");
const fetch = require("node-fetch");
const db = require("quick.db");
const Discord = require("discord.js");
const emojis = require("../emoji.json");

module.exports = async (client, message) => {
  // Do not let another bot use your bot
  if (message.author.bot) return;

  // Hello There
  if (message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
    return message.channel.send(`Hello ${message.author}, you can start by typing **${config.prefix}help**!`);
  }

  // Chat Bot
  if (ch.ch1.includes(message.channel.id)) {
    fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
      .then(response => response.json())
      .then(data => {
        message.reply(data.response)
      })
  }

  // AFK
  let afk = new db.table("AFKs"),
  authorStatus = await afk.fetch(message.author.id),
  mentioned = message.mentions.members.first();

if (mentioned) {
  let status = await afk.fetch(mentioned.id);

  if (status) {
    const embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .addField(`${emojis.exclamation} AFK Warning.`, `**${message.author.tag}** is now AFK!\nReason: \`${status}\``)
      .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
    message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
  }
}

if (authorStatus) {
  const embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .addField(`${emojis.exclamation} AFK Warning.`, `**${message.author.tag}** are no longer AFK.`)
    .setTimestamp()
    .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
  message.channel.send(embed).then(m => m.delete({ timeout: 15000 }));
  afk.delete(message.author.id);
}

  // Content
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  // Run
  cmd.run(client, message, args);
};