require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const User = require('./user.js');
const Tasks = require('./tasks.js');

const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("polling_error", (msg) => console.log(msg));

bot.onText(/\/start/, (msg, _match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  const user = new User(msg.from);
  const tasks = new Tasks(user.fetchTasks());
  
  bot.sendMessage(chatId, `
Hi ${user.name}!
/do [task name] - create a new task

${tasks.buildTasksOverviewString()}`);
});

bot.onText(/\/do/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const reg = /^\/do (.*)/gm;
  const command = msg.match(reg)[1];
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Created a new task named "${command}"`);
});


