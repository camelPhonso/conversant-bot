require("dotenv/config")
const { Client, GatewayIntentBits } = require("discord.js")
const OpenAI = require("openai")

// set up openAI API and discord.js client
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

// log into discord
client.login(process.env.BOT_TOKEN)
client.on("ready", () => {
  console.log(
    "\033[32:1m",
    "The bot is online. Call it 'Diane' to get a response."
  )
})

// process messages when sent
client.on("messageCreate", async message => {
  // set up a trigger for bot responses
  if (message.content.startsWith("diane")) {
    // define bot behaviour with 'system' role
    let conversation = [
      {
        role: "system",
        content:
          "You are a helpful but nerdy assistant, your dnd character is a level 50 warlock wood elf and you like to let people know this frequently in varied and subtle ways",
      },
    ]

    await message.channel.sendTyping()

    // ignore messages from other bots and different users
    // check the last 10 messages and log them into the conversation
    let previousMessages = await message.channel.messages.fetch({ limit: 10 })
    previousMessages.reverse().forEach(entry => {
      if (entry.author.id !== client.user.id && message.author.bot) return
      if (entry.author.id !== message.author.id) return

      conversation.push({
        role: "user",
        content: entry.content,
      })
    })

    // get response from openAI and reply to user
    let reply = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    })
    message.reply(reply.choices[0].message.content)
  }
})
