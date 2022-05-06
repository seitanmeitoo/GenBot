const config = require('../../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('Le bot est prêt !');

    client.user.setActivity(`${config.prefix}help • ${client.user.username.toUpperCase()}`, { type: "PLAYING" });
    const devGuild = await client.guilds.cache.get(config.genGuild);
    devGuild.commands.set(client.commands.map(cmd => cmd));
  },
};