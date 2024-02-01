const mockData = require('./mockData.js');
const {generateRandomString} = require('./utilities.js');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.first_name;
  }

  fetchTasks(){
    return mockData.tasks[this.id];
  }

  fetchActiveTask() {
    return mockData.users[this.id].activeTask;
  }

  activateTask(taskId) {
    const task = mockData.tasks[this.id]
      .find(t => t.id===taskId);
    mockData.users[this.id].activeTask = {...task} ?? null;
  }

  addNewTask(name) {
    const newTask = {
        name,
        id: generateRandomString(),
    };
    mockData.users[this.id].activeTask = newTask;
    mockData.tasks[this.id].push(newTask);
  }

  deleteActiveTask() {
    const targetId = mockData.users[this.id]?.activeTask?.id;
    if(!targetId) return;

    mockData.users[this.id].activeTask = null;

    const targetIndex = mockData.tasks[this.id]
      .findIndex(t=>t.id===targetId);
    if(targetIndex<0) return; 
    mockData.tasks[this.id].splice(targetIndex,1);
  }

  markActiveTaskAsDone() {
    const targetId = mockData.users[this.id]?.activeTask?.id;
    if(!targetId) return;

    mockData.users[this.id].activeTask = null;

    const targetIndex = mockData.tasks[this.id]
      .findIndex(t=>t.id===targetId);
    if(targetIndex<0) return; 
    mockData.tasks[this.id][targetIndex].dateDone = new Date(Date.now());
  }

  markActiveTaskAsUndone() {
    const targetId = mockData.users[this.id]?.activeTask?.id;
    if(!targetId) return;

    mockData.users[this.id].activeTask = null;

    const targetIndex = mockData.tasks[this.id]
      .findIndex(t=>t.id===targetId);
    if(targetIndex<0) return; 
    // the only line that's different from markActiveTaskAsDone()
    delete mockData.tasks[this.id][targetIndex].dateDone;
  }
}

module.exports = User;
