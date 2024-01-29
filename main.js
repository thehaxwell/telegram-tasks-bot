require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const User = require('./user.js');
const Tasks = require('./tasks.js');

const token = process.env.BOT_TOKEN
console.log({token})

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, _match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  const user = new User(msg.from);
  
  bot.sendMessage(chatId, `
Hi ${user.name}!
/see_tasks - see the tasks you have to do
/create_task - create a new task`);
});

bot.onText(/\/see_tasks/, (msg, _match) => {
  const chatId = msg.chat.id;
  const user = new User(msg.from);
  const tasks = new Tasks(user.fetchTasks());
  
  console.log(tasks.buildTasksOverviewString());

  bot.sendMessage(chatId, `
${tasks.buildTasksOverviewString()}`);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
