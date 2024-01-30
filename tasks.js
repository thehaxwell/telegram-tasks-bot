function dateIsWithinNumDays(date, numDays) {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= numDays;
}

class Tasks {
  constructor(tasksSrc){
    this.src = tasksSrc;
  }

  buildTasksOverviewString(){
    const tasksDueToday = this.src.filter(task => dateIsWithinNumDays(task.dueDate, 1));
    const otherTasksDueInAWeek = this.src.filter(task => !dateIsWithinNumDays(task.dueDate, 1) && dateIsWithinNumDays(task.dueDate, 7));
    
    return [
      `=> You have ${tasksDueToday.length} tasks due today:`,
      tasksDueToday.map((task,idx) => ` * ${task.name}`).join('\n'),
      `\n=> You have ${otherTasksDueInAWeek.length} other tasks due in a week:`,
      otherTasksDueInAWeek.map(task => ` * ${task.name}`).join('\n'),
    ].join('\n');
  }
}

module.exports = Tasks;

