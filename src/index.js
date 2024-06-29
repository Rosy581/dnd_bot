require("dotenv").config();
const run = require("./register-commands").run;
const cmds = require("./register-commands.js").cmnds;
const frekayRoll = require("../script.js")
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
    if (!mod) {
        mod = 0
    }
    mod = parseInt(mod)
    let rolls = []
    n = !n ? 1 : n
    for (let i = 0; i < n; i++) {
        rolls.push(Math.round(Math.random() * max) + 1)
    }
    let total = rolls.reduce((a, b) => { return a + b }, 0) + mod
    return {
        rolls,
        mod,
        total
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
        let dm = interaction.options.get("directmessage")
        if (interaction.commandName !== "multiroll") {
            let n = interaction.options.get("amount")
            let mod = interaction.options.get("modifier")
            if (!mod) {
                mod = undefined
            } else {
                mod = mod.value
            }
            if (!n) {
                n = undefined
            } else {
                n = n.value
            }
            console.log(n)
            let die = interaction.commandName
            die = parseInt(die.split("d")[1])
            let rollie = roll(die, n, mod)
            console.log(rollie)
            let responce = `**Roll(s) : ** ${n ? n : 1}d${die}${mod ? "+" + mod : ""} (${rollie.rolls.join(", ")})\n**TOTAL : ** ${rollie.total}`
            if (dm) {
                interaction.user.send(responce)
                interaction.reply({ ephemeral: true, content: "Roll has been dmed to you" })
            } else {
                interaction.reply(responce)
            }
        }else {
        console.log("thru")
        let rollers = interaction.options.get("rolls").value
        let fin = frekayRoll(rollers,roll)
        let str = []
        console.log(fin.og)
        let of = 0
        for(let i = 0;i<fin.og.length;i++){
            if(fin.og[i].length>1){
                str.push(fin.og[i][0]+"d"+fin.og[i][1])
                str.push(" (")
                let temp = []
                    for(let j = 0;j<fin.og[i][0];j++){
                        temp = (fin.rolls[j+of])
                    }
                    str.push(temp.join(", "))
                    str.push(") + ")
            } else {
                of++
                console.log(fin.rolls[i])
                str.push(fin.rolls[i],"+ ")
            }
        }
        console.log(str.join(""))
        if(dm){ 
            interaction.user.send(`**Roll(s) : ** `)
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
