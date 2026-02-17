require('dotenv').config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    Events,
    REST,
    Routes,
} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register commands here (manual list, no loaders)
client.commands = new Collection();
client.commands.set('ping', require('./commands/ping'));
client.commands.set('reload', require('./commands/reload'));

client.once(Events.ClientReady, async (c) => {
    console.log(`Logged in as ${c.user.tag}`);

    // Build the command JSON payload from your command files
    const commandsJson = [];
    for (const [name, cmd] of client.commands) {
        if (!cmd?.data?.toJSON) {
                console.warn(`Skipping command "${name}" — missing SlashCommandBuilder data.`);
                console.warn(cmd);
            continue;
        }
        commandsJson.push(cmd.data.toJSON());
    }

    // auto-determine IDs
    const clientId = client.application?.id;
    if (!clientId) {
        console.error('Could not determine CLIENT_ID from client.application.id');
        return;
    }

    const guild = client.guilds.cache.first();
    if (!guild) {
        console.error('Bot is not in any guilds yet, cannot auto-register guild commands.');
        return;
    }

    const guildId = guild.id;
    // register to the first guild
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log(`Registering slash commands to: ${guild.name} (${guildId}) ...`);
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsJson }
        );
        console.log('Commands registered.');
    } catch (err) {
        console.error('Failed to register commands:', err);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    try {
        await cmd.execute(interaction);
    } catch (err) {
        console.error(err);
        const msg = { content: 'Command failed.', ephemeral: true };

        if (interaction.deferred || interaction.replied) await interaction.followUp(msg);
        else await interaction.reply(msg);
    }
});

client.login(process.env.TOKEN);