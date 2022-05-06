// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'help', // Command name
  permissions: ['SEND_MESSAGES'], // Permissions required
  description: 'Displays the list of available commands', // Command description displays in the help command or slash command
    run(client, message, args) {
      const { commands } = message.client; // Get commands from the client

      const embed = new MessageEmbed()
            .setColor(config.color.default)
            .setTitle('📄 | Command list')
            .setDescription(commands.map(c => `**\`${config.prefix}${c.name}\`**: ${c.description ? c.description : '*No description provided*'}`).join('\n')) // generates a message for all commands
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
      
      message.reply({ embeds: [embed] });
  },
  runSlash(client, interaction) {
    const { commands } = interaction.client; // Get commands from the client

      const embed = new MessageEmbed()
            .setColor(config.color.default)
            .setTitle('📄 | Command list')
            .setDescription(commands.map(c => `**\`${config.prefix}${c.name}\`**: ${c.description ? c.description : '*No description provided*'}`).join('\n')) // generates a message for all commands
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()
    
      interaction.reply({ embeds: [embed], ephemeral: true });
  },
};