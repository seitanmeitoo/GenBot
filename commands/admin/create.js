// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

module.exports = {
  name: 'create', // Command name
  permissions: ['ADMINISTRATOR'], // Permissions required
  description: 'Créé un nouveau service', // Command description displays in the help command or slash command
  run(client, message, args) {
      // Parameters
      const service = args[0];

      // If the "service" parameter is missing
      if (!service) {
          const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('⚙ | Parameters missing!')
            .setDescription('You must give a service name!')
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
          return message.reply({ embeds: [embed] });
      };

      const filePath = `${__dirname}/../../stock/${args[0]}.txt`; // File path where create the new service file

      // Create new file
      fs.writeFile(filePath, '', function (error) {
            if (error) return log.error(error); // If an error occured, log to console

            const embed = new MessageEmbed()
                .setColor(config.color.green)
                .setTitle('✅ | Service created!') 
                .setDescription(`New ${args[0]} service created!\n\n*Don't forget to gen in the service once to remove the bug from the first gen*`)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()
            return message.reply({ embeds: [embed] });
        });
  },
  options: [
    {
      name: 'name',
      description: 'Choose a name for your service',
      type: 'STRING',
      required: true,
    }
  ],
  runSlash(client, interaction) {
    const name = interaction.options.getString('name');
    
    const filePath = `${__dirname}/../../stock/${name}.txt`; // File path where create the new service file

      // Create new file
      fs.writeFile(filePath, '', function (error) {
            if (error) return log.error(error); // If an error occured, log to console

            const embed = new MessageEmbed()
                .setColor(config.color.green)
                .setTitle('✅ | Service created!') 
                .setDescription(`New ${name} service created!\n\n*Don't forget to gen in the service once to remove the bug from the first gen*`)
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [embed], ephemeral: true });
        });
  },
};