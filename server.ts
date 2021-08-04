import { Message, User } from 'discord.js';

if (process.env.NODE_ENV !== 'PROD') require('dotenv').config();
const Discord = require('discord.js');
const CHAIN_GANG_CHANNEL_ID = '860809577595666432'
const TOKEN: string = process.env.TOKEN || "";
if (TOKEN === "") throw new Error("TOKEN env var not found");

type EventHandler = (msg?: Message) => Promise<void>
interface Bot {
    login: (token: string) => null
    user: User
    on: (event: string, handler: EventHandler) => null
}

const bot: Bot = new Discord.Client();

function isChannelId(id: string): any {
    return id == CHAIN_GANG_CHANNEL_ID
}

const isMessageValid = async (currentMessage: Message): Promise<boolean> => {
    let channel = currentMessage.channel;
    const res = await channel.messages.fetch({ limit: 2 })
    const lastMessage = res.last() || { content: "0", author: null};

    const lastEnteredNumber = +lastMessage.content;
    if (isNaN(lastEnteredNumber)) return Promise.resolve(false);
    console.log('lastEnteredNumber inside isMessageValid ', lastEnteredNumber);

    const currentEnteredNumber = +currentMessage.content;
    if (isNaN(currentEnteredNumber)) return Promise.resolve(false);
    if (!currentMessage.content.match(/^[1-9][0-9]*$/)) return Promise.resolve(false);
    if (currentMessage.author?.id === lastMessage.author?.id) return Promise.resolve(false);
    console.log('currentEnteredNumber inside isMessageValid ', currentEnteredNumber);

    return currentEnteredNumber === lastEnteredNumber + 1;
}

bot.on('ready', async () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (msg?: Message) => {
    if (!msg) {
        console.log("on message handler had no message. this is an error.");
        return;
    }
    if (isChannelId(msg.channel.id)) {
        console.log('user input in the channel', msg.content)
        let isValid = false;
        try {
            isValid = await isMessageValid(msg);
        } finally {
            if (!isValid) msg.delete()
        }
    }
});

bot.login(TOKEN);