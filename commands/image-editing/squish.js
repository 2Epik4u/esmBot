import ImageCommand from "#cmd-classes/imageCommand.js";

class SquishCommand extends ImageCommand {
  static description = "Squishes/stretches an image";
  static aliases = ["squishy", "squash"];

  static noImage = "You need to provide an image/GIF to squish!";
  static command = "squish";
}

export default SquishCommand;
