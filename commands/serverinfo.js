exports.run = async (message) => {
  const owner = await message.channel.guild.members.get(message.channel.guild.ownerID);
  const infoEmbed = {
    "embed": {
      "title": message.channel.guild.name,
      "thumbnail": {
        "url": message.channel.guild.iconURL
      },
      "color": 16711680,
      "fields": [
        {
          "name": "🔢 **ID:**",
          "value": message.channel.guild.id
        },
        {
          "name": "👤 **Owner:**",
          "value": `${owner.user.username}#${owner.user.discriminator}`
        },
        {
          "name": "🗺 **Region:**",
          "value": message.channel.guild.region
        },
        {
          "name": "🗓 **Created on:**",
          "value": new Date(message.channel.guild.createdAt).toString()
        },
        {
          "name": "👥 **Users:**",
          "value": message.channel.guild.memberCount
        },
        {
          "name": "💬 **Channels:**",
          "value": message.channel.guild.channels.size
        },
        {
          "name": "😃 **Emojis:**",
          "value": message.channel.guild.emojis.length
        }
      ]
    }
  };
  return message.channel.createMessage(infoEmbed);
};

exports.aliases = ["server"];
exports.category = 1;
exports.help = "Gets some info about the server";