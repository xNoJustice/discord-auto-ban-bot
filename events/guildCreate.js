const { UpdatePresence } = require("../utils");

module.exports = {
  name: "guildCreate",

  run(client, guild) {
    UpdatePresence();
    client.logger.log(`⚠️ • The bot joined to ${guild.name}`, "warn");
  },
};
