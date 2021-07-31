require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

let lastEnteredNumber = 56;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {

    // let targetChanel = msg.guild.channels.cache.get('860809577595666432')
    if (msg.channel.id == '860809577595666432') {
        let input = msg.content;
        const inputChecker = (input) => {
            if (input == lastEnteredNumber + 1) {
                lastEnteredNumber += 1;
                return true
            } else {
                return false
            }
        }
        if (!inputChecker(input)) await msg.delete()
    }
});
