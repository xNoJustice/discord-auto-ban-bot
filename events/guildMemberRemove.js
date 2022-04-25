const { Permissions, MessageEmbed } = require("discord.js");
const client = require("../index");

module.exports = {
  name: "guildMemberRemove",

  async run(member) {
    if (member.user.bot) return;

    if (!member.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      client.logger.log(
        `❌ • I don't have permission to ban members! (${member.user.tag} left from ${member.guild.name})`,
        "error",
      );

      return;
    }

    const notification = (member, leftBan) => {
      client.logger.log(
        `⚠️ • ${member.user.tag} ${leftBan} from ${member.guild.name}`,
        "warn",
      );

      const channel = member.guild.channels.cache.find(
        channel => channel.name === "ban-logs",
      );
      if (channel) {
        const msg = new MessageEmbed()
          .setColor("#0099ff")
          .setAuthor({
            name: member.user.username,
            iconURL: member.user.avatarURL(),
          })
          .setThumbnail(member.user.avatarURL())
          .setDescription(
            `**✈️ • <@${member.user.id}> ${leftBan} from ${member.guild.name}**`,
          )
          .setFooter({
            text: member.guild.name,
          })
          .setTimestamp();

        channel
          .send({ embeds: [msg] })
          .then(() => {
            client.logger.log(
              `✈️ • <@${member.user.id}> ${leftBan} message send to ${member.guild.name}`,
              "warn",
            );
          })
          .catch(err => client.logger.log(`❌ • ${err}`, "error"));
      }
    };

    if (member.partial) {
      try {
        await member.user.fetch();
        client.logger.log(`• MEMBER PARTIAL`, "info");
      } catch (error) {
        client.logger.log(`❌ • ${error}`, "error");
      }
    }

    notification(member, "left");

    await member
      .ban({ reason: "Banned by Bot" })
      .then(member => {
        notification(member, "banned");
      })
      .catch(err => client.logger.log(`❌ • ${err}`, "error"));
  },
};
