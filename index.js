// Main
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const disbut = require("discord-buttons")(client);

// Config
client.commands = new Discord.Collection();
const config = require('./config.json');
const emojis = require('./emoji.json');
client.emojis = emojis
client.config = config;

// Discord Button
const { MessageButton, MessageActionRow } = require('discord-buttons');

client.on('clickButton', async (button) => {
    if (button.id == "nukeyes") {
        await button.defer()

        let channel = client.channels.cache.get(button.channel.id)
        var posisi = channel.position;

        const embed = new Discord.MessageEmbed()
            .addField(`${emojis.yes} Nuked`, `Channel has been nuked.`)
            .setColor(config.color)
            .setTimestamp()

        channel.clone().then((channel2) => {
            channel2.setPosition(posisi)
            channel.delete()
            channel2.send(embed).then(m => m.delete({ timeout: 30000 }));
        })
    }

    if (button.id == "nukeno") {
        await button.defer()
        button.channel.send(`${emojis.no} Channel nuking has been canceled!`).then(m => m.delete({ timeout: 30000 }));
        button.message.delete()
    }
})

// Giveaway Manager
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./storage.json",
    updateCountdownEvery: config.count,
    default: {
        botsCanWin: false,
        embedColor: config.color,
        reaction: config.reaction
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} left giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

// Events Handler
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`====================\n👌 Event loaded: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// Commands Handler
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`====================\n➔ Command loaded: ${commandName}`);
    });
});

client.login(config.token);

// JANCOK JANCOK HAYUK BAPAK LO NGENTOT!