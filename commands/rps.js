const config = require("../config.json");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(message.member.id){
        let embed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          .addField("Rock Papper Scissor!", `Select your weapon!`)
        m = await message.channel.send(embed);
        await m.react("👊");
        await m.react("✋"); 
        await m.react("✌");
        let choices = {};
        await m.awaitReactions((reaction, user) => user.id === message.member.id, {max: 1, time: 60000, errors:['time','max']})
          .then(collected => {
            try{
                succes = collected.get("👊");
                if(succes){  
                    choices[message.member.id] = "r"
                    m.delete();
                }
            }catch(err){
  
            }
            try{
                succes = collected.get("✋");
                if(succes){  
                    choices[message.member.id] = "p"
                    m.delete();
                }
            }catch(err){
  
            }
            try{
                succes = collected.get("✌");
                if(succes){  
                    choices[message.member.id] = "s"
                    m.delete();
                }
            }catch(err){
  
            }
        })
        pos = ["r","p","s"]
        choices['ai'] = pos[Math.floor((Math.random() * pos.length))];
        id = 'ai'
        pos = {"r" : "👊","p" : "✋","s" : "✌"}
        embed = new Discord.MessageEmbed()
        .setDescription(`${message.author.tag} choosed: ` + pos[choices[message.member.id]] + "\n" + `${client.user.username}` + " choosed: " + pos[choices[id]])
        .setFooter(`Replying to ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        switch("" + choices[message.member.id] + choices[id]){
          case 'rs':
          case 'pr':
          case 'sp':
              embed.setColor(config.color).setTitle("Congratulation you won!");
              message.channel.send(embed);
              break;
          case 'rp':
          case 'ps':
          case 'sr':
              embed.setColor(config.color).setTitle("Oh no, you lose..");
              message.channel.send(embed);
              break;
          case 'rr':
          case 'pp':
          case 'ss':
              embed.setColor(config.color).setTitle("Who is the winner?");
              message.channel.send(embed);
              break;
        }
      }
}