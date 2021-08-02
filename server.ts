require('dotenv').config();
const Discord = require('discord.js');
const CHAIN_GANG_CHANNEL_ID = '860809577595666432'
const TOKEN: string = process.env.TOKEN || "";
if (TOKEN === "") throw new Error("TOKEN env var not found");

interface User {
    tag: string
}

type EventHandler = (msg?: Message) => Promise<void>

interface Bot {
    channels: Channels
    login: (token: string) => null
    user: User
    on: (event: string, handler: EventHandler) => null
}

const bot: Bot = new Discord.Client();

bot.login(TOKEN);


function isChannelId(id: string): any {
    return id == CHAIN_GANG_CHANNEL_ID
}

interface Messages {
    fetch: (params: FetchParams) => Promise<FetchResult>
}

interface Channel {
    id: string
    messages: Messages
}

type Getter = (id: string) => Channel

interface Cache {
    get: Getter
}

interface Channels {
    cache: Cache
}

interface FetchParams {
    limit?: number
}

interface FetchResult {
    first: () => Message | null
    last: () => Message | null
}

interface Message {
    channel: Channel
    content: string
    delete: Function
    fetch: (params: FetchParams) => Promise<FetchResult>
}

const isMessageValid = async (currentMessage: Message): Promise<boolean> => {
    let channel = currentMessage.channel;
    const res = await channel.messages.fetch({ limit: 2 })
    const lastMessage = res.last() || {content: "0"};

    const lastEnteredNumber = parseInt(lastMessage.content);
    console.log('lastEnteredNumber inside isMessageValid ', lastEnteredNumber);

    const currentEnteredNumber = parseInt(currentMessage.content);
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
        let isValid = await isMessageValid(msg);
        if (!isValid) msg.delete()
    }
});