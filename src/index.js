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
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],partials: [
        Partials.Channel,
        Partials.Message
      ]
});

const roll = (max, n) =>{
    if(max == undefined || max == 0){
        throw new Error("Number not found or out of range")
    }
    max = max-1
    let rolls = []
    n = !n?1:n
    for(let i = 0;i<n;i++){
        rolls.push(Math.round(Math.random()*max)+1)
    }
    return rolls.join(', ')
}

bot.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand()) {
		console.log(
			`${interaction.user.username} command ${interaction.commandName}`
		);
        let n = interaction.options.get("amount").value
        console.log(n)
		switch (interaction.commandName){
            case "d100":
                interaction.reply(roll(100,n))
                break;
            case "d20":
                interaction.reply(roll(20,n))
                break;
            case "d12":
                interaction.reply(roll(12,n))
                break;
            case "d10":
                interaction.reply(roll(10,n))
                break;
            case "d8":
                interaction.reply(roll(8,n))
                break;
            case "d6":
                interaction.reply(roll(6,n))
                break;
            case "d4":
                interaction.reply(roll(4,n))
                break;
            case "coinflip":
                let result = roll(2,n)
                let results = []
                for(let i = 0;i<n;i++){
                    results.push(result[i] == 1?"heads":"tails")
                }
                interaction.reply(results)
                
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