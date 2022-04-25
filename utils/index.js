const client = require("../index");
require("dotenv").config();

module.exports = {
  UpdatePresence() {
    client.logger.log(
      `> ✅ • Ready as ${client.user.tag}! ${new Date()} to serve in ${
        client.channels.cache.size
      } channels on ${client.guilds.cache.size} servers, for a total of ${
        client.users.cache.size
      } users.`,
      "success",
    );
    client.user.setPresence({
      activities: [
        {
          name: client.guilds.cache.size + " servers",
          type: "COMPETING",
          url: "https://github.com/xNoJustice",
        },
      ],
      status: "available",
    });
  },
};
