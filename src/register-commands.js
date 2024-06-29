const {
    REST,
    Routes,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require("discord.js");
const { describe } = require("node:test");

const cmnds = [
    {
        name: "d100",
        description: "Roll 1 or more d100s ",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d20",
        description: "Roll 1 or more d20s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d12",
        description: "Roll 1 or more d12s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d10 ",
        description: "Roll 1 or more d10s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d8",
        description: "Roll 1 or more d8s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d6",
        description: "Roll 1 or more d6s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "d4",
        description: "Roll 1 or more d4s",
        options: [
            {
                name: "amount",
                description: "how many dice do you want to roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }, {
                name: "modifier",
                description: "Add or subtract however much from the roll",
                type: ApplicationCommandOptionType.Number,
                required: false
            }
        ]
    }, {
        name: "coinflip",
        description: "Flip a coin 50/50",
        options: [
            {
                name: "amount",
                description: "how many times do you want to flip",
                type: ApplicationCommandOptionType.Number,
                required: false
            }, {
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }
        ]
    }, {
        name: "multiroll",
        description: "Roll multiple dice at once",
        options: [
            {
                name: "rolls",
                description: "The rolls go here",
                type: ApplicationCommandOptionType.String,
                required: true
            },{
                name: "directmessage",
                description: "Do you want the results to be dmed to you? or are the dm",
                type: ApplicationCommandOptionType.Boolean,
                required: false
            }
        ]
    }
]




const run = async (cmds) => {
    rest = new REST().setToken(process.env.TOKEN);
    try {
        console.log("loadin :3");
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: cmds,
            }
        );
        console.log("CHILLIN");
    } catch (error) {
        console.log(`there was an error ${error}`);
    }
};
module.exports = { run, cmnds };