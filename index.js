const { Client, Intents, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  partials: ["GUILD_MEMBER"],
});
require("dotenv").config();

module.exports = client;

client.commands = new Collection();
client.cooldowns = new Collection();
client.events = new Collection();
client.logger = require("./utils/logger");

const commandFiles = readdirSync("./commands").filter(file =>
  file.endsWith(".js"),
);

const eventFiles = readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.events.set(event.name, event);
}

client.on("ready", () => {
  const event = client.events.get("ready");
  event.run(client);
});

client.on("guildCreate", guild => {
  const event = client.events.get("guildCreate");
  event.run(client, guild);
});

client.on("guildDelete", guild => {
  const event = client.events.get("guildDelete");
  event.run(client, guild);
});

client.on("guildMemberRemove", member => {
  const event = client.events.get("guildMemberRemove");
  event.run(member);
});

client.on("messageCreate", message => {
  const event = client.events.get("messageCreate");
  event.run(client, message);
});

process.on("unhandledRejection", error =>
  client.logger.log("UNHANDLED_REJECTION\n" + error, "error"),
);
process.on("uncaughtException", error => {
  client.logger.log("UNCAUGHT_EXCEPTION\n" + error, "error");
});

client.login(process.env.TOKEN);
