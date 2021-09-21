const ms = require('ms');
const config = require("../config.json");
const emojis = require('../emoji.json');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(`${emojis.no} You need **Manage_Guild** permission or @Giveaways role to run this command!`);
    }

    let giveawayChannel = message.mentions.channels.first();

    if(!giveawayChannel){
        return message.channel.send(`${emojis.no} You have to mention the channel first!\nExample: \`${config.prefix}start #Giveaway\``);
    }

    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`${emojis.no} You have to specify a valid duration!\nExample: \`${config.prefix}start #Giveaway 1h\``);
    }

    let giveawayNumberWinners = args[2];

    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(`${emojis.no} You have to specify a valid number of winner(s)!\nExample: \`${config.prefix}start #Giveaway 1h 1\`\nDo not include \`w\` after the winner amount`);
    }

    let giveawayPrize = args.slice(3).join(' ');

    if(!giveawayPrize){
        return message.channel.send(`${emojis.no} You have to specify a valid prize!\nExample: \`${config.prefix}start #Giveaway 1h 1 Discord Nitro\``);
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: "INFORMATION",
        //prize: giveawayPrize,
        //winnerCount: giveawayNumberWinners,
        winnerCount: giveawayNumberWinners,
        hostedBy: client.config.hostedBy ? message.author : null,
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+`${emojis.giveaway} **GIVEAWAY STARTED** ${emojis.giveaway}`,
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+`${emojis.giveaway} **GIVEAWAY ENDED** ${emojis.giveaway}`,
            timeRemaining: `${emojis.bell} Time remaining: {duration}`,
            inviteToParticipate: `${emojis.info} | React with ${config.reaction} to participate!\n${emojis.star} Winner(s): ${giveawayNumberWinners}`,
            winMessage: `${emojis.giveaway} Congratulations, {winners}! You won **${giveawayPrize}**!`,
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: `${emojis.staff} Hosted by: ${message.author}\n${emojis.gift} Prize: ${giveawayPrize}`,
            //winners: `${emojis.star} | winner(s)`,
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    message.channel.send(`${emojis.yes} Giveaway started in ${giveawayChannel}!`);

};
