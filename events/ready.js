module.exports = (client) => {

  // Bot Activity
    console.log(`Ready as ${client.user.tag} to serve in ${client.channels.cache.size} channel(s) on ${client.guilds.cache.size} server(s), for a total of ${client.users.cache.size} user(s).`);

      function randomStatus() {
    let status = [`${client.guilds.cache.size.toLocaleString()} Server(s)`, `${client.guilds.cache.size.toLocaleString()} Server(s)`]
    let rstatus = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[rstatus], {type: "WATCHING"});
  }
  setInterval(randomStatus, 60000);
};
