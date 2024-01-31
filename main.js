require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const User = require('./user.js');
const Tasks = require('./tasks.js');

const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("polling_error", (msg) => console.log(msg));

const NEW_TASK_COMMAND = "/do [task name] - create a new task";

bot.onText(/\/start/, (msg, _match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  const user = new User(msg.from);
  const tasks = new Tasks(user.fetchTasks());
  
  bot.sendMessage(chatId, `
Hi ${user.name}!
${NEW_TASK_COMMAND}

${tasks.buildTasksOverviewString()}`, {parse_mode: 'HTML'});
});

bot.on('message', (msg) => {
  const reg = /^\/do (.*)/gm;

  const found = [...msg.text.matchAll(reg)][0];
  if(!found) return;
  const command = found[1];
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `
Created a new task named "${command}"

This task is due today. /change_due_date to change the due date
/delete - delete this task
/done - mark this task as done

/start - see your tasks

${NEW_TASK_COMMAND}
`);
});


bot.on('message', (msg) => {
  const reg = /^\/edit_(.*)/gm;

  const found = [...msg.text.matchAll(reg)][0];
  if(!found) return;
  const command = found[1];
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `
Edit the task "${command}"

This task is due today. /change_due_date to change the due date
/delete - delete this task
/done - mark this task as done

/start - see your tasks

${NEW_TASK_COMMAND}
`);
});


