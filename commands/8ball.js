module.exports = {
  name: "8ball",
  cooldown: 120,
  execute(message) {
    let answers = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      `Don't count on it.`,
      `It is certain.`,
      `It is decidedly so.`,
      `Most likely.`,
      `My reply is no.`,
      `My sources say no.`,
      `Outlook not so good.`,
      `Outlook good.`,
      `Reply hazy, try again.`,
      `Signs point to yes.`,
      `Very doubtful.`,
      `Without a doubt.`,
      `Yes.`,
      `Yes - definitely.`,
      `You may rely on it.`,
    ];
    const BallNumber = Math.floor(Math.random() * answers.length);
    message.reply({
      content: answers[BallNumber],
      allowedMentions: { users: [message.author.id] },
    });
  },
};
