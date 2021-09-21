const config = require("../config.json");
const Discord = require("discord.js");
const fetch = require("node-fetch").default;
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    let [query, branch] = args;

    if (!query) return message.channel.send(`${emojis.no} Please include a search query!\nExample: \`${config.prefix}docs message\``);
    if (!branch) branch = "stable";

    fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(json => {
            if (!json) return message.channel.send(`${emojis.no} I didn't fount what you want to search for.`);

            message.channel.send({ embed: json });
        })
        .catch(() => {
            message.channel.send(`${emojis.no} Couldn't fetch docs.`);
        })
}