require("dotenv/config")
const { Client, GatewayIntentBits } = require("discord.js")
const OpenAI = require("openai")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
  console.log("Diane is on the line")
})

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const params = {
  messages: [
    {
      role: "user",
      context:
        "you are a simulation created to effect the aesthetics of consciousness",
    },
  ],
  model: "gpt-3.5",
}

client.on("messageCreate", async message => {
  if (message.content.startsWith("diane")) {
    await message.channel.sendTyping()

    const reply = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    })

    message.reply(reply.data.choices[0].message)
  }
})
