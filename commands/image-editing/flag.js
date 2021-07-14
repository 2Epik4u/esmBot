const fs = require("fs");
const emojiRegex = require("emoji-regex");
const emoji = require("node-emoji");
const ImageCommand = require("../../classes/imageCommand.js");

class FlagCommand extends ImageCommand {
  flagPath = "";

  async criteria() {
    if (!this.args[0].match(emojiRegex)) return false;
    const flag = emoji.unemojify(this.args[0]).replaceAll(":", "").replace("flag-", "");
    let path = `./assets/images/region-flags/png/${flag.toUpperCase()}.png`;
    if (flag === "🏴‍☠️") path = "./assets/images/pirateflag.png";
    if (flag === "rainbow-flag") path = "./assets/images/rainbowflag.png";
    if (flag === "checkered_flag") path = "./assets/images/checkeredflag.png";
    if (flag === "🏳️‍⚧️") path = "./assets/images/transflag.png";
    try {
      await fs.promises.access(path);
      this.flagPath = path;
      return true;
    } catch {
      return false;
    }
  }

  params() {
    return {
      overlay: this.flagPath
    };
  }

  static description = "Overlays a flag onto an image";
  static arguments = ["[flag]"];

  static requiresText = true;
  static noText = "You need to provide an emoji of a flag to overlay!";
  static noImage = "You need to provide an image to overlay a flag onto!";
  static command = "flag";
}

module.exports = FlagCommand;