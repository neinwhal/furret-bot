require('dotenv').config();
const { REST, Routes } = require('discord.js');

// Put your IDs in .env
// TOKEN=...
// CLIENT_ID=...
// GUILD_ID=...   (for fast testing in one server)
const commands = [
  require('./commands/ping').data.toJSON(),
  require('./commands/roll').data.toJSON(),
  require('./commands/help').data.toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Done.');
  } catch (err) {
    console.error(err);
  }
})();
