const chalk = require("chalk");
const timezone = require("moment-timezone");

module.exports = class Logger {
  static log(content, type = "info") {
    const date = `${timezone
      .tz("Europe/Istanbul")
      .format("DD-MM-YYYY hh:mm:ss")}`;
    switch (type) {
      // Check the message type and then print him in the console
      case "info": {
        return console.log(
          `${chalk.hex("#1FAC64")(
            ` ❯ INFO        ${chalk.hex("#1FAC64")(`[${date}]`)} `,
          )} ${chalk.hex("#59a5e9")(content)}`,
        );
      }
      case "warn": {
        return console.log(
          `${chalk.hex("#1FAC64")(
            ` ❯ WARNING     ${chalk.hex("#1FAC64")(`[${date}]`)} `,
          )} ${chalk.hex("#ffd966")(content)}`,
        );
      }
      case "error": {
        return console.log(
          `${chalk.hex("#1FAC64")(
            ` ❯ ERROR       ${chalk.hex("#1FAC64")(`[${date}]`)} `,
          )} ${chalk.hex("#E06666")(content)}`,
        );
      }
      case "success": {
        return console.log(
          `${chalk.hex("#1FAC64")(
            ` ❯ SUCCESS     ${chalk.hex("#1FAC64")(`[${date}]`)} `,
          )} ${chalk.hex("#1FAC64")(content)}`,
        );
      }
      default:
        throw new TypeError(
          "Logger type must be either info, warn, error, cmd, event or success.",
        );
    }
  }
};
