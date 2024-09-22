const amToBr = require("./american-to-british-spelling");
module.exports = Object.fromEntries(
  Object.entries(amToBr).map(([k, v]) => [v, k])
);
