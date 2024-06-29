require("dotenv").config();
const run = require("./register-commands").run;
const cmds = require("./register-commands.js").cmnds;
const {
    Client,
    IntentsBitField,
    ActivityType
} = require("discord.js")

const bot = new Client({
    intents: [
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roll = (max, n, mod) => {
    if (max == undefined || max == 0) {
        throw new Error("Number not found or out of range")
    }
    max = max - 1
    mod = mod + 1
    let rolls = []
    n = !n ? 1 : n
    for (let i = 0; i < n; i++) {
        rolls.push(Math.round(Math.random() * max) + mod)
    }
    return {
        rolls,
        mod
    }
}

bot.on("messageCreate", async (message) => {
    if (message.author.bot) return
    console.log(message.author.username, "said", message.content)
    if (message.content == "FREAKY") {
        console.log("fuck")
        message.author.send("this works")
    }
})

bot.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log(
            `${interaction.user.username} command ${interaction.commandName}`
        );
        console.log(interaction)
        let n = interaction.options.get("amount")
        let dm = interaction.options.get("directmessage")
        let mod = interaction.options.get("modifier")
        if (!mod) {
            mod = undefined
        } else {
            mod = n.value
        }
        if (!n) {
            n = undefined
        } else {
            n = n.value
        }
        console.log(n)
        if (dm) {
            dm = dm.value
            interaction.reply({ ephemeral: true, content: "Dmed to you" })
            switch (interaction.commandName) {
                case "d100":
                    interaction.user.send(roll(100, n));
                    break;
                case "d20":
                    interaction.user.send(roll(20, n));
                    break;
                case "d12":
                    interaction.user.send(roll(12, n));
                    break;
                case "d10":
                    interaction.user.send(roll(10, n));
                    break;
                case "d8":
                    interaction.user.send(roll(8, n));
                    break;
                case "d6":
                    interaction.user.send(roll(6, n));
                    break;
                case "d4":
                    interaction.user.send(roll(4, n));
                    break;
                case "coinflip":
                    let result = roll(2, n);
                    let results = [];
                    for (let i = 0; i < n; i++) {
                        results.push(result[i] == 1 ? "heads" : "tails");
                    }

                    interaction.user.send(results)

            }
        } else {
            switch (interaction.commandName) {
                case "d100":
                    interaction.reply(roll(100, n))
                    break;
                case "d20":
                    interaction.reply(roll(20, n))
                    break;
                case "d12":
                    interaction.reply(roll(12, n))
                    break;
                case "d10":
                    interaction.reply(roll(10, n))
                    break;
                case "d8":
                    interaction.reply(roll(8, n))
                    break;
                case "d6":
                    interaction.reply(roll(6, n))
                    break;
                case "d4":
                    interaction.reply(roll(4, n))
                    break;
                case "coinflip":
                    let result = roll(2, n)
                    let results = []
                    for (let i = 0; i < n; i++) {
                        results.push(result[i] == 1 ? "heads" : "tails")
                    }
                    interaction.reply(results)

            }
        }
    }
})

bot.on("ready", () => {
    console.log("DND-ing");
    bot.user.setPresence({
        status: `online`,
        activities: [
            {
                name: "D-ing my D",
                type: ActivityType.Playing,
                state: "No we it is suffering",
            },
        ],
    });
});
run(cmds);
bot.login(process.env.TOKEN);