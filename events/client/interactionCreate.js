module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return interaction.reply(`This command does not exist!`);

      if (!interaction.member.permissions.has([cmd.permissions])) {
      const embed = new MessageEmbed()
            .setColor(config.color.red)
            .setTitle('❌ | Access denied :(')
            .setDescription(`Sorry, you do not have the required permission(s)\nYou must have the following permission(s): \`${cmd.permissions.join(', ')}\` !`)
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
      
      cmd.runSlash(client, interaction);
    }
  },
};