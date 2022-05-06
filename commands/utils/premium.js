// Dependencies
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
  name: 'premium', // Command name
  permissions: ['SEND_MESSAGES'], // Permissions required
  description: 'Know how to get the bot premium', // Command description displays in the help command or slash command
  run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle('📄 | PREMIUM PLANS')
      .setThumbnail('https://via.placeholder.com/250x250.png?text=Premium')
      .setDescription(`\`\`\`diff\n# [PREMIUM GEN]\n----------------\n- PREMIUM LITE | € 2,50\n- PREMIUM +    | € 6,99\n- PREMIUM ++   | € 9,99\n\`\`\`\n*Please contact <@${config.owner}> to purchase a plan above.*`)
      .setTimestamp()
      .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });
    
    message.reply({ embeds: [embed] }); // send a message
  },
  runSlash(client, interaction) {
    const embed = new MessageEmbed()
      .setTitle('📄 | PREMIUM PLANS')
      .setThumbnail('https://via.placeholder.com/250x250.png?text=Premium')
      .setDescription(`\`\`\`diff\n# [PREMIUM GEN]\n----------------\n- PREMIUM LITE | € 2,50\n- PREMIUM +    | € 6,99\n- PREMIUM ++   | € 9,99\n\`\`\`\n*Please contact <@${config.owner}> to purchase a plan above.*`)
      .setTimestamp()
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
    
    interaction.reply({ embeds: [embed], ephemeral: true }); // send a message
  },
};