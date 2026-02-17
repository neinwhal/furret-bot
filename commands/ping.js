const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with latency and runtime statistics.'),

    async execute(interaction) {
        const sent = Date.now();

        // Send a temporary reply
        //await interaction.reply({ content: 'Pinging...', fetchReply: true });
        await interaction.deferReply();

        const roundTrip = Date.now() - sent;
        const wsPing = interaction.client.ws.ping;

        const uptimeSeconds = Math.floor(interaction.client.uptime / 1000);
        const uptimeMinutes = Math.floor(uptimeSeconds / 60);
        const uptimeHours = Math.floor(uptimeMinutes / 60);
        const memoryMB = Math.round(process.memoryUsage().rss / 1024 / 1024);

        const embed = new EmbedBuilder()
            .setTitle('🏓')
            .setColor('Green')
            .addFields(
                { name: '', value:
                    `**Round-Trip Latency**
                        \`${roundTrip} ms\`
                    **Uptime**
                        \`${uptimeHours}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s\``,
                inline: true },
                { name: '', value:
                    `**WebSocket Ping**
                        \`${wsPing} ms\`
                    **Memory Usage**
                        \`${memoryMB} MB\``,
                inline: true },
            )
            .setTimestamp();

        await interaction.editReply({
            content: null,
            embeds: [embed]
        });
    }
};