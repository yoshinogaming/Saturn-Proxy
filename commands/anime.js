const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();
const Discord = require("discord.js");
const config = require('../config.json')
const emojis = require("../emoji.json");

exports.run = async (client, message, args) => {
    let arg = message.content.split(" ").slice(1);
    const arg1 = arg.join(" ");

    if (!arg1) return message.channel.send(`${emojis.no} Enter the name of anime you want to search!`);

    const search = arg1;

    kitsu.searchAnime(search).then(async result => {
        const anime = result[0];

        if (result.length === 0) return message.channel.send(`${emojis.no} There is no result called \`${search}\`!`);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`${emojis.yes} ${anime.titles.romaji ? anime.titles.romaji : "Unknown"}`)
            .setThumbnail(anime.posterImage.original)
            .addField(`${emojis.exclamation} Synopsis`, `\`\`\`yml\n${anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0]}\`\`\``)
            .addField(`${emojis.info} Anime Information`, `\`\`\`yml\nJapanese: ${anime.titles.japanese ? anime.titles.japanese : "Unknown"}\nEnglish: ${anime.titles.english ? anime.titles.english : "Unknown"}\nRating: ${anime.averageRating ? anime.averageRating : "Unknown"}/100\nStart date: ${anime.startDate ? anime.startDate : "Unknown"}\nEnd date: ${anime.endDate ? anime.endDate : "Unknown"}\nType: ${anime.showType ? anime.showType : "Unknown"}\nEpisodes: ${anime.episodeCount ? anime.episodeCount : "Unknown"}\nDuration: ${anime.episodeLength ? anime.episodeLength : "??"} minutes\nRank: ${anime.ratingRank ? anime.ratingRank : "Unknown"}\`\`\``)
            .setTimestamp()
            .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send(embed);

        // I HATE ANIME NGL, ITS SO BORING AND ITS 18+ LOL. I MADE THIS COMMAND JUST FOR FUN, NOT BECAUSE I LOVE ANIME LOLOLOLOLOLOLOL
    })
}