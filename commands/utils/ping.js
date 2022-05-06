// Dependencies
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping', // Command name
  permissions: ['SEND_MESSAGES'], // Permissions required
  description: 'Returns pong and the ping of the bot', // Command description displays in the help command or slash command
  run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle('🏓 Pong !')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: 'Latency', value: `\`${client.ws.ping}ms\``, inline: true },
        { name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
    
    message.reply({ embeds: [embed] });
  },
  runSlash(client, interaction) {
    const embed = new MessageEmbed()
      .setTitle('🏓 Pong !')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: 'Latency', value: `\`${client.ws.ping}ms\``, inline: true },
        { name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
    
    interaction.reply({ embeds: [embed] });
  },
};