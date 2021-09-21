const config = require("../config.json")
const Discord = require("discord.js")
const fetch = require("node-fetch");
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");

    let countries = args;

    if (!arg1) return message.channel.send(`${emojis.no} | Try again with the Country name!\nExample: \`${config.prefix}corona Indonesia\``)

    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
        .then(res => res.json())
        .then(data => {
            let country = data.country;
            let confirmed = data.cases.toLocaleString();
            let todayconfirmed = data.todayCases.toLocaleString();
            let deaths = data.deaths.toLocaleString();
            let todaydeaths = data.todayDeaths.toLocaleString();
            let recovered = data.recovered.toLocaleString();
            let critical = data.critical.toLocaleString();
            let active = data.active.toLocaleString();
            let todayrecovered = data.todayRecovered.toLocaleString();

            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTimestamp()
                .setThumbnail('https://cdn.pixabay.com/photo/2020/04/19/07/13/coronavirus-5062185_960_720.png')
                .setTitle(`${emojis.info} Corona Information`)
                .addField(`${emojis.yes} ${country}.`, `\`\`\`js\nTotal Cases\nConfirmed: ${confirmed}\nDeath: ${deaths}\nRecovered: ${recovered}\n\nToday Cases\nConfirmed: ${todayconfirmed}\nDeath: ${todaydeaths}\nRecovered: ${todayrecovered}\n\nOther Cases\nActive: ${active}\nCritical: ${critical}\`\`\``)
                .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

            message.channel.send(embed);
            // Kapan Corona Selesai Sih Ngentotttt!
        })
}