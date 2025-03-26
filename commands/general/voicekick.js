import { Constants } from "oceanic.js"; 
import Command from "../../classes/command.js";

class VoiceKickCommand extends Command {
  async run() {
    this.success = false;
    const member = this.member.id
    if (!this.member?.voiceState) return this.getString("sound.noVoiceState");
    if (!this.guild) return this.getString("guildOnly");
    if (!this.memberPermissions.has("KICK_MEMBERS") && !this.options.user) {
      return "You can only kick people from the voice chat if you have Kick Members!";
    }

    if (!this.options.user) {
      this.success = true;
      await member.voiceState.disconnect()
      return "You have left the voice chat.";
    } 
    await member.voiceState.disconnect()
    this.success = true;
    return `user has been kicked from the voice chat.`;
  }

  static flags = [{
    name: "user",
    type: Constants.ApplicationCommandOptionTypes.USER, // translates to 6, see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
    ephemeral: true,
    description: "The user to kick from the voice channel",
    required: false,
    classic: true
  }];

  static description = "Kicks a user from voice chat (you don't need permission to kick yourself)";
  static aliases = ["kick"];
}

export default VoiceKickCommand;
