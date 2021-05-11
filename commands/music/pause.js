const MusicCommand = require("../../classes/musicCommand.js");

class PauseCommand extends MusicCommand {
  async run() {
    if (process.env.NODE_ENV === "production") return "Music commands are coming soon, but they aren't ready yet. Stay tuned to @esmBot_ on Twitter for updates!";

    if (!this.message.channel.guild) return "This command only works in servers!";
    if (!this.message.member.voiceState.channelID) return "You need to be in a voice channel first!";
    if (!this.message.channel.guild.members.get(this.client.user.id).voiceState.channelID) return "I'm not in a voice channel!";
    if (this.connection.host !== this.message.author.id) return "Only the current voice session host can pause/resume the music!";
    const player = this.connection.player;
    player.pause(!player.paused ? true : false);
    return `🔊 The player has been ${!player.paused ? "paused" : "resumed"}.`;
  }

  static description = "Pauses/resumes the current song";
  static aliases = ["resume"];
}

module.exports = PauseCommand;