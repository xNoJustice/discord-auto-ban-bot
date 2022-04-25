const { UpdatePresence } = require("../utils");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,

  run() {
    UpdatePresence();
  },
};
