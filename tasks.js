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
    const tasksDueToday = this.src.filter(task => !task.hasOwnProperty('dateDone') && task.hasOwnProperty('dueDate') && dateIsWithinNumDays(task.dueDate, 1));
    const otherTasksDueInAWeek = this.src.filter(task => !task.hasOwnProperty('dateDone') && task.hasOwnProperty('dueDate') && !dateIsWithinNumDays(task.dueDate, 1) && dateIsWithinNumDays(task.dueDate, 7));
    

    let lines = [];
    if(tasksDoneToday.length>0){
      lines.push("\nTasks you've done today🎉");
      lines.push(tasksDoneToday.map(displayTask).join('\n'));
    }

    if(tasksDueToday.length>0){
      lines.push(`\nTasks due today❗`);
      lines.push(tasksDueToday.map(displayTask).join('\n'));
    }


    if(otherTasksDueInAWeek.length>0){
      lines.push(`\nTasks due this week⏳`);
      lines.push(otherTasksDueInAWeek.map(displayTask).join('\n'));
    }

    return lines.join('\n');
  }
}

module.exports = Tasks;

