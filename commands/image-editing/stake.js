import ImageCommand from "../../classes/imageCommand.js";

class StakeCommand extends ImageCommand {
  params = {
    water: "assets/images/stake.png",
    gravity: 1,
    resize: true,
    append: true
  };

  static description = "Adds the Stake watermark to an image";

  static noImage = "You need to provide an image/GIF to add a Stake watermark!";
  static command = "watermark";
}

export default StakeCommand;
