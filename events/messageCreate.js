const { Collection } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "messageCreate",

  async run(client, message) {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
      return;
    const args = message.content
      .slice(process.env.PREFIX.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift().toLowerCase();

    let command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName),
      );

    if (!command) return;

    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }

    let now = Date.now();
    let timeStamp = client.cooldowns.get(command.name) || new Collection();
    let cool = command.cooldown || 5;
    let userCool = timeStamp.get(message.author.id) || 0;
    let estimated = userCool + cool * 1000 - now;

    if (userCool && estimated > 0) {
      let cool = new discord.MessageEmbed().setDescription(
        `❌ Please wait ${(
          estimated / 1000
        ).toFixed()}s more before reusing the ${command.name} command.`,
      );
      return await message.reply({ embeds: [cool] }).then(msg => {
        setTimeout(() => msg.delete().catch(() => null), estimated);
      });
    }

    timeStamp.set(message.author.id, now);
    client.cooldowns.set(command.name, timeStamp);

    try {
      command.execute(message);
    } catch (error) {
      client.logger.log(error, "error");
      message.reply({
        content: `there was an error trying to execute that command!`,
      });
    } finally {
      client.logger.log(
        `> ID : ${message.author.id} | User : ${message.author.tag} | command | ${command.name}`,
        "info",
      );
    }
  },
};
