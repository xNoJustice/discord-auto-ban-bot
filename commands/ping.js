module.exports = {
  name: "ping",
  cooldown: 10,
  execute(message) {
    message.reply({
      content: "pong! ",
      allowedMentions: { users: [message.author.id] },
    });
  },
};
