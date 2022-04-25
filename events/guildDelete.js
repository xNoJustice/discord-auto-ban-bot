const { UpdatePresence } = require("../utils");

module.exports = {
  name: "guildDelete",

  run(client, guild) {
    UpdatePresence();
    client.logger.log(`⚠️ • The bot left from ${guild.name}`, "warn");
  },
};
