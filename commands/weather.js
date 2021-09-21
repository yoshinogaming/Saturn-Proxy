const config = require("../config.json");
const Discord = require("discord.js");
const emojis = require("../emoji.json");
const weather = require("weather-js");

exports.run = async (client, message, args) => {
    let messageArray = message.content.split(" ")
    let args1 = messageArray.slice(1);
    let city = args1.join(" ");
    let degreetype = "C";

    await weather.find({search: city, degreeType: degreetype}, function(err, result) {
        if (!city) return message.channel.send(`${emojis.no} Try again with the City name!\nExample: \`${config.prefix}weather Jakarta\``);
        if (err || result === undefined || result.length === 0) return message.channel.send(`${emojis.no} | Unknown City, try again..`);

        let current = result[0].current;
        let location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setTitle(`${emojis.info} Weather Information`)
        .setDescription(`> ${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setTimestamp()
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor(config.color)

        embed.addField(`${emojis.yes} ${current.observationpoint}.`, `\`\`\`yml\nLatitude: ${location.lat}\nLongitude: ${location.long}\nFeels like: ${current.feelslike}°C\nDegree type: ${location.degreetype}\nWinds: ${current.winddisplay}\nHumidity: ${current.humidity}\nTimezone: GMT ${location.timezone}\nTemperature: ${current.temperature}°C\nObservation time: ${current.observationtime}\`\`\``)

        return message.channel.send(embed);
    })
}