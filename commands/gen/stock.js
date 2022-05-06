// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');

module.exports = {
  name: 'stock', // Command name
  permissions: ['SEND_MESSAGES'], // Permissions required
  description: 'Displays the list of available accounts', // Command description displays in the help command or slash command
  run(client, message, args) {
    // If the stock channel is not given in config or invalid
    try {
            message.guild.channels.cache.get(config.stockChannel).id; // Try to get the channel's id
        } catch (error) {
            if (error) log.error(error); // If an error occured log to console

            // Send error messsage if the "error_message" field is "true" in the configuration
            if (config.command.error_message === true) {
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('⚠ | Error Occurred!')
                    .setDescription('No valid stock channel specified!')
                    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp()
                return message.reply({ embeds: [embed] });
            } else return;
        };
    // If the message channel id is the stock channel id in configuration
    if (message.channel.id === config.stockChannel) {
      // Arrays
      const stock = [];

      fs.readdir(`${__dirname}/../../stock/`, function (err, files) {
            // Read all of the services
              if (err) return console.log('Failed to parse directory: ' + err);

              // Put services into the stock
              files.forEach(function (file) {	
                  if (!file.endsWith('.txt')) return	
                  stock.push(file) 	
              });

              const embed = new MessageEmbed()
                .setColor(config.color.default)
                .setTitle('🛒 | Free Generator Stock Counter')
                .setDescription(`📦 | Number of account services : \`${stock.length}\`\n\n`)
                .setThumbnail("https://via.placeholder.com/250x250.png?text=STOCK")
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()

              // Push all services to the stock
              stock.forEach(async function (data) {	
                  const acc = fs.readFileSync(`${__dirname}/../../stock/${data}`, 'utf-8')	
          	  const lines = [];

                  // Get number of lines
                  acc.split(/\r?\n/).forEach(function (line) {
                      lines.push(line); 
                  });

                  // Update embed field message
                  embed.addField(`👤 ${data.replace('.txt','').toUpperCase()} :`, `\n🔑 \`${lines.length}\` left`, true)
              });

              message.reply({ embeds: [embed] });
        });
    } else {
        // If the command executed in another channel
            const embed = new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('❌ | Misuse of command!')
                .setDescription(`You cannot use the \`stock\` command in this channel! Try it in <#${config.stockChannel}>!`)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()
            return message.reply({ embeds: [embed] });
        };
    
  },
  runSlash(client, interaction) {
    // If the stock channel is not given in config or invalid
    try {
            interaction.guild.channels.cache.get(config.stockChannel).id; // Try to get the channel's id
        } catch (error) {
            if (error) log.error(error); // If an error occured log to console

            // Send error messsage if the "error_message" field is "true" in the configuration
            if (config.command.error_message === true) {
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('⚠ | Error Occurred!')
                    .setDescription('No valid stock channel specified!')
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp()
                return interaction.reply({ embeds: [embed], ephemeral: true });
            } else return;
        };
    // If the message channel id is the stock channel id in configuration
    if (interaction.channel.id === config.stockChannel) {
      // Arrays
        const stock = [];

        
        fs.readdir(`${__dirname}/../../stock/`, function (err, files) {
          // Read all of the services
              if (err) return console.log('Failed to parse directory: ' + err);

              // Put services into the stock
              files.forEach(function (file) {	
                  if (!file.endsWith('.txt')) return	
                  stock.push(file) 	
              });

              const embed = new MessageEmbed()
                .setColor(config.color.default)
                .setTitle('🛒 | Free Generator Stock Counter')
                .setDescription(`📦 | Number of account services : \`${stock.length}\`\n\n`)
                .setThumbnail("https://via.placeholder.com/250x250.png?text=STOCK")
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()

              // Push all services to the stock
              stock.forEach(async function (data) {	
                  const acc = fs.readFileSync(`${__dirname}/../../stock/${data}`, 'utf-8')	
          	  const lines = [];

                  // Get number of lines
                  acc.split(/\r?\n/).forEach(function (line) {
                      lines.push(line); 
                  });

                  // Update embed field message
                  embed.addField(`👤 ${data.replace('.txt','').toUpperCase()}:`, `\n🔑 \`${lines.length}\` restant(s)`, true)
              });

              interaction.reply({ embeds: [embed], ephemeral: true });
        });
  } else {
        // If the command executed in another channel
            const embed = new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('❌ | Misuse of command!')
                .setDescription(`You cannot use the \`stock\` command in this channel! Try it in <#${config.stockChannel}>!`)
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [embed], ephemeral: true });
        };
  },
}