const client = require("../utils/client.js");
const { version } = require("../package.json");

exports.run = async () => {
  const infoEmbed = {
    "embed": {
      "description": process.env.NODE_ENV === "development" ? "**You are currently using esmBot Dev! Things may change at any time without warning and there will be bugs. Many bugs.**" : "",
      "color": 16711680,
      "author": {
        "name": "esmBot Info/Credits",
        "icon_url": client.user.avatarURL
      },
      "fields": [{
        "name": "ℹ️ Version:",
        "value": `v${version}${process.env.NODE_ENV === "development" ? "-dev" : ""}`
      },
      {
        "name": "📝 Credits:",
        "value": "Bot by **[Essem](https://essem.space)**\nIcon by **[MintBorrow](https://mintborrow.newgrounds.com)**"
      },
      {
        "name": "💬 Total Servers:",
        "value": client.guilds.size
      },
      {
        "name": "✅ Official Server:",
        "value": "[Click here!](https://discord.gg/vfFM7YT)"
      },
      {
        "name": "💻 Source Code:",
        "value": "[Click here!](https://github.com/esmBot/esmBot)"
      },
      {
        "name": "<:twitter:652550515372064768> Twitter:",
        "value": "[Click here!](https://twitter.com/esmBot_)"
      }
      ]
    }
  };
  return infoEmbed;
};

exports.aliases = ["botinfo", "credits"];
exports.category = 1;
exports.help = "Gets some info/credits about me";