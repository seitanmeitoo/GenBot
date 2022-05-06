const { MessageEmbed } = require('discord.js');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();
const config = require('../../config.json');
const prefix = config.prefix;

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(client, message) {
    if (message.author.bot) return;
    if (message.mentions.members.first() == config.idBot) return message.reply(`My prefix is \`${prefix}\``);
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    if (cmdName.length == 0) return;

    if (config.command.notfound_message === true && !client.commands.has(cmdName)) {
        const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('❔ | Unknown command :(')
            .setDescription(`Sorry, but I can't find the command \`${cmdName}\`!\nUse \`${prefix}help\` to see the list of commands\n*Remember to check the name of the command typed.*`)
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()

        return message.reply({ embeds: [embed] });
    };

    let cmd = client.commands.get(cmdName);
    
    if (!message.member.permissions.has([cmd.permissions])) {
      const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('❌ | Access denied :(')
            .setDescription(`Sorry, you do not have the required permission(s)\nYou must have the following permission(s): \`${cmd.permissions.join(', ')}\` !`)
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()

        return message.reply({ embeds: [embed] });
    }
    
    try {
        client.commands.get(cmdName).run(client, message, args);
    } catch (error) {
        log.error(error);
    
		  if (config.command.error_message === true) {
          const embed = new MessageEmbed()
              .setColor(config.color.red)
              .setTitle('⚠ | Error has occurred!')
              .setDescription(`An error occurred while executing the command \`${cmdName}\` !`)
              .addField('Error', `\`\`\`js\n${error}\n\`\`\``)
              .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() })
              .setTimestamp()
      
          return message.reply({ embeds: [embed] });
      };
	  };
  }
};