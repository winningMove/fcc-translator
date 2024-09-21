const amToBr = require("./american-to-british-titles");
module.exports = Object.fromEntries(
  Object.entries(amToBr).map(([k, v]) => [v, k])
);
