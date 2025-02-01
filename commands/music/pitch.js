import MusicCommand from "../../classes/musicCommand.js";

class PitchCommand extends MusicCommand {
  async run() {
    this.success = false;
    if (!this.guild) return this.getString("guildOnly");
    if (!this.member?.voiceState) return this.getString("sound.noVoiceState");
    if (!this.guild.voiceStates.get(this.client.user.id)?.channelID) return this.getString("sound.notInVoice");
    if (!this.connection) return this.getString("sound.noConnection");
    if (this.connection.host !== this.author.id && !this.memberPermissions.has("MANAGE_CHANNELS")) return "Only the current voice session host can change the pitch!";
    const vol = Number.parseInt(this.options.level ?? this.args[0]);
    if (Number.isNaN(vol) || vol > 1000 || vol < 0) return "You can only set the pitch between 0 and 1000!";
    const settings = {
      pitch: vol
    };

    await this.connection.player.setTimescale(settings);
    this.success = true;
    return `🔊 The pitch has been changed to \`${vol}\`.`;
  }

  static flags = [{
    name: "level",
    type: 4,
    description: "The pitch level",
    minValue: 0,
    maxValue: 1000,
    required: true,
    classic: true
  }];
  static description = "Sets the pitch of the music";
  static aliases = ["pitch"];
}

export default PitchCommand;
