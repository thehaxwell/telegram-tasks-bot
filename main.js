require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const User = require('./user.js');
const Tasks = require('./tasks.js');

const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("polling_error", (msg) => console.log(msg));

const NEW_TASK_COMMAND = "/do [task name] - create a new task";
const SEE_TASKS_COMMAND = "/start - see your tasks";
const TASK_DONE_INDICATOR_EMOJI = '👍🏼';
const TASK_UNDONE_INDICATOR_EMOJI = '👉🏼';

const showStartPage = (firstLine,tasksInstance) => `
${firstLine}
${NEW_TASK_COMMAND}
${SEE_TASKS_COMMAND}
${tasksInstance.buildTasksOverviewString()}`;

bot.onText(/\/start/, (msg, _match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  const user = new User(msg.from);
  const tasks = new Tasks(user.fetchTasks());

  bot.sendMessage(chatId, showStartPage(`Hi ${user.name}!`,tasks), {parse_mode: 'HTML'});

});

function taskOptionsString(task){
  return [
    `This task is due today. /change_due_date to change the due date`,
    '/delete - delete this task',
    `/${task.hasOwnProperty('dateDone')?'undone':'done'} - mark this task as ${task.hasOwnProperty('dateDone')
        ? TASK_UNDONE_INDICATOR_EMOJI+'undone/incomplete'
        :TASK_DONE_INDICATOR_EMOJI+'done/completed'}`,
  ].join('\n');
}

bot.on('message', (msg) => {
  const reg = /^\/do (.*)/gm;

  const found = [...msg.text.matchAll(reg)][0];
  if(!found) return;
  const command = found[1];
  const chatId = msg.chat.id;

  const user = new User(msg.from);
  user.addNewTask(command);

  bot.sendMessage(chatId, `
Created a new task named "${command}"

${taskOptionsString(user.fetchActiveTask())}

/start - see your tasks

${NEW_TASK_COMMAND}
`);
});


bot.on('message', (msg) => {
  const reg = /^\/edit_(.*)/gm;

  const found = [...msg.text.matchAll(reg)][0];
  if(!found) return;
  const taskId = found[1];
  const chatId = msg.chat.id;

  const user = new User(msg.from);
  user.activateTask(taskId);

  const activeTask = user.fetchActiveTask();

  bot.sendMessage(chatId, `
Edit the task "${activeTask.name}"

${taskOptionsString(activeTask)}

${SEE_TASKS_COMMAND}

${NEW_TASK_COMMAND}
`);
});


bot.onText(/\/delete/, (msg, _match) => {
  const chatId = msg.chat.id;

  const user = new User(msg.from);
  user.deleteActiveTask();
  const tasks = new Tasks(user.fetchTasks());
  
  bot.sendMessage(chatId, showStartPage('You deleted the task',tasks), {parse_mode: 'HTML'});
});

bot.onText(/\/done/, (msg, _match) => {
  const chatId = msg.chat.id;

  const user = new User(msg.from);
  user.markActiveTaskAsDone();
  const tasks = new Tasks(user.fetchTasks());
  
  bot.sendMessage(chatId, showStartPage('You marked the task as done',tasks), {parse_mode: 'HTML'});
});

bot.onText(/\/undone/, (msg, _match) => {
  const chatId = msg.chat.id;

  const user = new User(msg.from);
  user.markActiveTaskAsUndone();
  const tasks = new Tasks(user.fetchTasks());
  
  bot.sendMessage(chatId, showStartPage('You marked the task as undone',tasks), {parse_mode: 'HTML'});
});

