import MusicCommand from "../../classes/musicCommand.js";

class MusicSpeedCommand extends MusicCommand {
  async run() {
    this.success = false;
    if (!this.guild) return this.getString("guildOnly");
    if (!this.member?.voiceState) return this.getString("sound.noVoiceState");
    if (!this.guild.voiceStates.get(this.client.user.id)?.channelID) return this.getString("sound.notInVoice");
    if (!this.connection) return this.getString("sound.noConnection");
    if (this.connection.host !== this.author.id && !this.memberPermissions.has("MANAGE_CHANNELS")) return "Only the current voice session host can change the speed!";
    const vol = Number.parseFloat(this.options.level ?? this.args[0]);
    if (Number.isNaN(vol) || vol > 1000 || vol < 0) return "You can only set the speed between 0 and 1000!";
    const settings = {
      speed: vol
    };

    await this.connection.player.setTimescale(settings);
    this.success = true;
    return `🔊 The speed has been changed to \`${vol}\`.`;
  }

  static flags = [{
    name: "level",
    type: 4,
    description: "The speed level",
    minValue: 0,
    maxValue: 1000,
    required: true,
    classic: true
  }];
  static description = "Sets the speed of the music";
  static aliases = ["fast"];
}

export default MusicSpeedCommand;
