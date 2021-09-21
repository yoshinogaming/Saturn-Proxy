const ms = require('ms');
const config = require("../config.json");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
        return message.channel.send(`${emojis.no} You need **Manage_Guild** permission or @Giveaways role to run this command!`);
    }

    if (!args[0]) {
        return message.channel.send(`${emojis.no} You have to provide a valid giveaway ID!`);
    }

    let giveaway =
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if (!giveaway) {
        return message.channel.send(`${emojis.no} Unable to find giveaway with the ID: \`${args.join(' ')}\`.`);
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
        .then(() => {
            message.channel.send(`${emojis.yes} Giveaway will end in less than ` + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ` seconds...`);
        })
        .catch((e) => {
            if (e.startsWith(`${emojis.no} Giveaway with message ID ${giveaway.messageID} is already ended.`)) {
                message.channel.send(`${emojis.no} This giveaway is already ended!`);
            } else {
                console.error(e);
                message.channel.send(`${emojis.no} An error occured...`);
            }
        });

};
