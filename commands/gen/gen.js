// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();
const generated = new Set();

module.exports = {
  name: 'gen', // Command name
  permissions: ['SEND_MESSAGES'], // Permissions required
  description: 'Génére un compte gratuit', // Command description displays in the help command or slash command
  run(client, message, args) {
    // If the generator channel is not given in config or invalid
    try {
            message.guild.channels.cache.get(config.genChannel).id; // Try to get the channel's id
        } catch (error) {
            if (error) log.error(error); // If an error occured log to console

            // Send error messsage if the "error_message" field is "true" in the configuration
            if (config.command.error_message === true) {
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('⚠ | Error Occurred!')
                    .setDescription('No valid gen channel specified!')
                    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp()
                return message.reply({ embeds: [embed] });
            } else return;
        };
    // If the message channel id is the generator channel id in configuration
    if (message.channel.id === config.genChannel) {
      
            if (generated.has(message.author.id)) {
              // If the user have cooldown on the command
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('❌ | Cooldown !')
                    .setDescription('Please wait before running this command again!')
                    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp()
                return message.reply({ embeds: [embed] });
            } else {
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

                // File path to find the given service
                const filePath = `${__dirname}/../../stock/${args[0]}.txt`;

                // Read the service file
                fs.readFile(filePath, function (error, data) {
                    // If no error
                    if (!error) {
                        data = data.toString(); // Stringify the content

                        const position = data.toString().indexOf('\n'); // Get position
                        const firstLine = data.split('\n')[0]; // Get the first line

                        // If the service file is empty
                        if (position === -1) {
                            const embed = new MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('⚠ | Generator Error!')
                                .setDescription(`I do not find the \`${args[0]}\` service in my stock!`)
                                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                                .setTimestamp()
                            return message.reply({ embeds: [embed] });
                        };

                        // Send messages to the user
                        const embed = new MessageEmbed()
                            .setColor(config.color.green)
                            .setTitle('Congratulation!')
                            .addField('🌐 [ SERVICE ]', `\`${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()}\``, true)
                            .addField('👤 [ ACCOUNT ]', `[Your account](${firstLine})`, true)
                            .addField('🛠 [ ACCOUNT NOT WORKING? ]', `Open a replacement ticket on our main server.`)
                            .addField('🛒 [ UPGRADE ]', `Some services and features are locked for premium users only. To unlock them, open a ticket on the main server.`)
                            .setTimestamp()
                            .setImage("https://via.placeholder.com/665x375.png?text=THANK+YOU+FOR+HAVING+USED+GEN+BOT")
                        message.author.send({ embeds: [embed] })

                        // Send message to the channel if the user recieved the message
                        if (position !== -1) {
                            data = data.substr(position + 1); // Remove the gernerated account line

                            // Write changes
                            fs.writeFile(filePath, data, function (error) {
                                const embed = new MessageEmbed()
                                    .setColor(config.color.green)
                                    .setTitle('📦 | Successful generation!')
                                    .setThumbnail('https://cdn.discordapp.com/attachments/946310976419016764/955068477285212190/tick.png')
                                    .setDescription(`Your account \`${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()}\` was successfully generated and sent!\nCheck your private messages.`)
                                    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                                    .setTimestamp()
                                message.reply({ embeds: [embed] });

                                generated.add(message.author.id); // Add user to the cooldown set

                                if (message.member.roles.resolve(config.roleCooldown.fiveSecond)) {
                                  // Set cooldown time 5 s
                                setTimeout(() => {
                                    generated.delete(message.author.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fiveSecond); message.author.send('You have a 5s cooldown!');
                                } else if (message.member.roles.resolve(config.roleCooldown.fiveMinute)) {
                                  // Set cooldown time 5 min
                                setTimeout(() => {
                                    generated.delete(message.author.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fiveMinute); message.author.send('You have a 5min cooldown!');
                                } else if (message.member.roles.resolve(config.roleCooldown.fifteenMinute)) {
                                  // Set cooldown time 15 min
                                setTimeout(() => {
                                    generated.delete(message.author.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fifteenMinute); message.author.send('You have a 15min cooldown!');
                                } else if (message.member.roles.resolve(config.roleCooldown.thirtyMinute)) {
                                  // Set cooldown time 30 min
                                setTimeout(() => {
                                    generated.delete(message.author.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.thirtyMinute); message.author.send('You have a 30min cooldown!');
                                } else {
                                  // Set cooldown time defaut
                                setTimeout(() => {
                                    generated.delete(message.author.id); // Remove the user from the cooldown set after expire
                                }, config.genCooldown); message.author.send('You have a 1h cooldown!');
                                }

                                if (error) return log.error(error); // If an error occured, log to console
                            });
                        } else {
                            // If the service is empty
                            const embed = new MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('⚠ | Generator Error!')
                                .setDescription(`The \`${args[0]}\` service is empty!`)
                                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                                .setTimestamp()
                            return message.reply({ embeds: [embed] });
                        };
                } else {
                        const embed = new MessageEmbed()
                            .setColor(config.color.red)
                            .setTitle('⚠ | Generator Error!')
                            .setDescription(`Service \`${args[0]}\` does not exist!`)
                            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                            .setTimestamp()
                        return message.reply({ embeds: [embed] });
                    };
                });
            };
        } else {
            // If the command executed in another channel
            const embed = new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('❌ | Misuse of command!')
                .setDescription(`You cannot use the \`gen\` command in this channel! Try it ins <#${config.genChannel}>!`)
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()
            return message.reply({ embeds: [embed] });
        };
  },
  options: [
    {
      name: 'service',
      description: 'Choose the name of the service you want to generate',
      type: 'STRING',
      required: true,
    }
  ],
  runSlash(client, interaction) {
    // If the generator channel is not given in config or invalid
    try {
            interaction.guild.channels.cache.get(config.genChannel).id; // Try to get the channel's id
        } catch (error) {
            if (error) log.error(error); // If an error occured log to console

            // Send error messsage if the "error_message" field is "true" in the configuration
            if (config.command.error_message === true) {
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('❌ | Error Occurred!')
                    .setDescription('No valid build channel specified!\n*Please contact bot admins.*')
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp()
                return interaction.reply({ embeds: [embed] });
            } else return;
        };
    
    // If the message channel id is the generator channel id in configuration
    if (interaction.channel.id === config.genChannel) {
      
            if (generated.has(interaction.user.id)) {
                const embed = new MessageEmbed()
                    .setColor(config.color.red)
                    .setTitle('❌ | Cooldown !')
                    .setDescription('Please wait before running this command again!')
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp()
                return interaction.reply({ embeds: [embed], ephemeral: true });
            } else {
                // Parameters
                const service = interaction.options.getString('service');

                // File path to find the given service
                const filePath = `${__dirname}/../../stock/${service}.txt`;

                // Read the service file
                fs.readFile(filePath, function (error, data) {
                    // If no error
                    if (!error) {
                        data = data.toString(); // Stringify the content

                        const position = data.toString().indexOf('\n'); // Get position
                        const firstLine = data.split('\n')[0]; // Get the first line

                        // If the service file is empty
                        if (position === -1) {
                            const embed = new MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('⚠ | Generator Error!')
                                .setDescription(`I do not find the \`${service}\` service in my stock!`)
                                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                .setTimestamp()
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        };

                        const embed = new MessageEmbed()
                            .setColor(config.color.green)
                            .setTitle('Congratulation!')
                            .addField('🌐 [ SERVICE ]', `\`${service[0].toUpperCase()}${service.slice(1).toLowerCase()}\``, true)
                            .addField('👤 [ ACCOUNT ]', `[Your account](${firstLine})`, true)
                            .addField('🛠 [ ACCOUNT NOT WORKING? ]', `Open a replacement ticket on our main server.`)
                            .addField('🛒 [ UPGRADE ]', `Some services and features are locked for premium users only. To unlock them, open a ticket on the main server.`)
                            .setTimestamp()
                            .setImage("https://via.placeholder.com/665x375.png?text=THANK+YOU+FOR+HAVING+USED+GEN+BOT")
                        interaction.user.send({ embeds: [embed] })

                        // Send message to the channel if the user recieved the message
                        if (position !== -1) {
                            data = data.substr(position + 1); // Remove the gernerated account line

                            // Write changes
                            fs.writeFile(filePath, data, function (error) {
                                const embed = new MessageEmbed()
                                    .setColor(config.color.green)
                                    .setTitle('📦 | Successful generation!')
                                    .setThumbnail('https://cdn.discordapp.com/attachments/946310976419016764/955068477285212190/tick.png')
                                    .setDescription(`Your account \`${service[0].toUpperCase()}${service.slice(1).toLowerCase()}\`was successfully generated and sent!\nCheck your private messages.`)
                                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                    .setTimestamp()
                                interaction.reply({ embeds: [embed] });

                                generated.add(interaction.user.id); // Add user to the cooldown set

                                if (interaction.member.roles.resolve(config.roleCooldown.fiveSecond)) {
                                  // Set cooldown time 5 s
                                setTimeout(() => {
                                    generated.delete(interaction.user.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fiveSecond); interaction.user.send('You have a 5s cooldown!');
                                } else if (interaction.member.roles.resolve(config.roleCooldown.fiveMinute)) {
                                  // Set cooldown time 5 min
                                setTimeout(() => {
                                    generated.delete(interaction.user.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fiveMinute); interaction.user.send('You have a 5min cooldown!');
                                } else if (interaction.member.roles.resolve(config.roleCooldown.fifteenMinute)) {
                                  // Set cooldown time 15 min
                                setTimeout(() => {
                                    generated.delete(interaction.user.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.fifteenMinute); interaction.user.send('You have a 15min cooldown!');
                                } else if (interaction.member.roles.resolve(config.roleCooldown.thirtyMinute)) {
                                  // Set cooldown time 30 min
                                setTimeout(() => {
                                    generated.delete(interaction.user.id); // Remove the user from the cooldown set after expire
                                }, config.cooldown.thirtyMinute); interaction.user.send('You have a 30min cooldown!');
                                } else {
                                  // Set cooldown time defaut
                                setTimeout(() => {
                                    generated.delete(interaction.user.id); // Remove the user from the cooldown set after expire
                                }, config.genCooldown); interaction.user.send('You have a 1h cooldown!');
                                }

                                if (error) return log.error(error); 
                            });
                        } else {
                            // If the service is empty
                            const embed = new MessageEmbed()
                                .setColor(config.color.red)
                                .setTitle('⚠ | Generator Error!')
                                .setDescription(`The service \`${service}\` is empty!`)
                                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                .setTimestamp()
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        };
                } else {
                        // If the service does not exists
                        const embed = new MessageEmbed()
                            .setColor(config.color.red)
                            .setTitle('⚠ | Generator Error!')
                            .setDescription(`The service \`${service}\` does not exist!`)
                            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                            .setTimestamp()
                        return interaction.reply({ embeds: [embed], ephemeral: true });
                    };
                });
            };
        } else {
            // If the command executed in another channel
            const embed = new MessageEmbed()
                .setColor(config.color.red)
                .setTitle('❌ | Misuse of command!')
                .setDescription(`You cannot use the \`gen\` command in this channel! Try it in <#${config.genChannel}>!`)
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [embed], ephemeral: true });
        };
  },
};