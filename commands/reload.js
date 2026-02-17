const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload one command or all commands')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Command name, or "all"')
                .setRequired(true)
        ),

    async execute(interaction) {
        // Acknowledge immediately so Discord does not time out
        await interaction.deferReply({ ephemeral: true });

        const client = interaction.client;
        const name = interaction.options.getString('name', true).toLowerCase();

        const commandsDir = __dirname;

        const reloadOne = (commandName) => {
            const filePath = path.join(commandsDir, `${commandName}.js`);

            if (!fs.existsSync(filePath)) {
                return { ok: false, error: `File not found: \`${commandName}.js\`` };
            }

            try {
                delete require.cache[require.resolve(filePath)];
                const newCommand = require(filePath);

                if (!newCommand?.data?.toJSON || typeof newCommand.execute !== 'function') {
                    return { ok: false, error: `Invalid module shape in \`${commandName}.js\`` };
                }

                // Use the key the user expects (the filename / commandName)
                // but store by the actual slash command name
                client.commands.set(newCommand.data.name, newCommand);
                return { ok: true };
            } catch (e) {
                return { ok: false, error: e?.message ?? String(e) };
            }
        };

        if (name !== 'all') {
            const res = reloadOne(name);
            if (!res.ok) {
                return interaction.editReply(`Failed to reload \`${name}\`: ${res.error}`);
            }
            return interaction.editReply(`Reloaded \`${name}\`.`);
        }

        // Reload all
        const results = { ok: 0, fail: 0, failed: [] };

        // Clear the map first (so removed commands disappear)
        client.commands.clear();

        const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const commandName = path.basename(file, '.js');
            const res = reloadOne(commandName);

            if (res.ok) results.ok++;
            else {
                results.fail++;
                results.failed.push(`${commandName}: ${res.error}`);
            }
        }

        const lines = [
            `Reloaded commands: ${results.ok}`,
            `Failed: ${results.fail}`
        ];

        if (results.failed.length > 0) {
            lines.push('', 'Failures:', ...results.failed.slice(0, 10));
            if (results.failed.length > 10) lines.push(`...and ${results.failed.length - 10} more`);
        }

        return interaction.editReply(lines.join(', '));
    }
};
