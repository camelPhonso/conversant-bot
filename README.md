# conversant-bot

## Purpose
This repo is intended as a spike on how to build an AI Chatbot.
Conversant bot can be invited into a discord server and will respond to messages when prompted with the work "Diane". It can remember up to 10 messages from the same user in a conversation.

## Interacting with the code base
Feel free to copy this repo if you would like to explore the code. Conversant-bot is not deployed but will run on a development environment.

You will need to set up environment variables. I have created a `.env.example` file. 
Copy this code into your own `.env` and replace the values with your own bot token from discord and openAI API key.

- clone the repo
- run `npm install` on your terminal
- run `node bot.js`
- the terminal log will let you know once conversant-bot is online
- create an invite link on your discord bot and invite it to a server
