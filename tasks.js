function dateIsWithinNumDays(date, numDays) {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= numDays;
}

function displayTask(task){
  const icon = task.hasOwnProperty('dateDone') ? '👍🏼' :'👉🏼';
  const name = task.hasOwnProperty('dateDone') ? `<s>${task.name}</s>` : task.name;
return ` ${icon} ${name} /edit_${task.id}`;
}

class Tasks {
  constructor(tasksSrc){
    this.src = tasksSrc;
  }

  buildTasksOverviewString(){
    const tasksDoneToday = this.src.filter(task => task.hasOwnProperty('dateDone') && dateIsWithinNumDays(task.dateDone, 1));
    const tasksDueToday = this.src.filter(task => !task.hasOwnProperty('dateDone') && dateIsWithinNumDays(task.dueDate, 1));
    const otherTasksDueInAWeek = this.src.filter(task => !task.hasOwnProperty('dateDone') && !dateIsWithinNumDays(task.dueDate, 1) && dateIsWithinNumDays(task.dueDate, 7));
    
    return [
      `Tasks you've done today🎉`,
      tasksDoneToday.map(displayTask).join('\n'),
      `\nTasks due today❗`,
      tasksDueToday.map(displayTask).join('\n'),
      `\nTasks due this week⏳`,
      otherTasksDueInAWeek.map(displayTask).join('\n'),
    ].join('\n');
  }
}

module.exports = Tasks;

