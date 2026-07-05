const maptilerClient = require("@maptiler/client");

maptilerClient.config.apiKey = process.env.MAP_TOKEN; // Replace with your MapTiler API key

module.exports = maptilerClient;