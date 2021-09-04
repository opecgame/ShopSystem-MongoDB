const Discord = require('discord.js');
const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
        "GUILD_WEBHOOKS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING"
    ]
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const config = require('./settings.json');
const mongoose = require('mongoose');
const { loadCommands } = require('./utils/loadCommands');

mongoose.connect(config.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

require('./utils/loadEvents')(client);

client.userdata = require("./models/userdata")
client.itemdata = require("./models/itemdata")
client.snipes = new Map()

loadCommands(client);
client.login(config.token);
