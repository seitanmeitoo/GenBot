// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const os = require('os');
const config = require('../../config.json');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

module.exports = {
  name: 'add', // Command name
  permissions: ['ADMINISTRATOR'], // Permissions required
  description: 'Add stock in a specific service or create a new one (Slash command recommended)', // Command description displays in the help command or slash command
  run(client, message, args) {
    // Parameters
      const service = args[0];
      const account = args[1];

    // If the "service" parameter is missing
    if (!service) {
        const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('⚙ | Missing parameters!')
            .setDescription('You must specify a service!')
            .addField('For example', `${config.prefix}${this.name} **netflix** https://example.com`)
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
        return message.reply({ embeds: [embed] });
      // YOU NEED THE RETURN STATEMENT TO STOP THIS FUNCTION (if you remove the "return" statement, all of the functions below will be executed and breaks the command)
    };

    // If the "account" parameter is missing
    if (!account) {
        const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('⚙ | Missing parameters!')
            .setDescription('You must specify an account!')
            .addField('For example', `${config.prefix}${this.name} netflix **https://example.com**`)
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
        return message.reply({ embeds: [embed] });
    };

    const filePath = `${__dirname}/../../stock/${service}.txt`; // Searching for the stock

    // Append data to the file
    fs.appendFile(filePath, `${os.EOL}${account}`, function (error) {
            if (error) return log.error(error); // If an error occured or the stock not found, log to console

            const embed = new MessageEmbed()
                .setColor(config.color.green)
                .setTitle('✅ | Account added!')
                .setDescription(`Successfuly added ||\`${account}\`|| account to \`${service}\` service!`)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()
            return message.reply({ embeds: [embed] }).then(message => message.delete({ timeout: 5000 })); // Automatically delete the message after 5 seconds (sometimes bug)
        });
  },
  options: [
    {
      name: 'service',
      description: 'Choose the name of your service or choose a name for a new service',
      type: 'STRING',
      required: true,
    },
    {
      name: 'account',
      description: 'Enter the link of the account to add to your service in the form of "https://example.com"',
      type: 'STRING',
      required: true,
    }
  ],
  runSlash(client, interaction) {
    // Parameters
    const service = interaction.options.getString('service');
    const account = interaction.options.getString('account');

    const filePath = `${__dirname}/../../stock/${service}.txt`; // Searching for the stock

    // Append data to the file
    fs.appendFile(filePath, `${os.EOL}${account}`, function (error) {
            if (error) return log.error(error); // If an error occured or the stock not found, log to console

            const embed = new MessageEmbed()
                .setColor(config.color.green)
                .setTitle('✅ | Account added!')
                .setDescription(`Successfuly added ||\`${account}\`|| account to \`${service}\` service!`)
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [embed], ephemeral: true }); // ephemeral => only you can see the message
        });
  },
};