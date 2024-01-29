const mockData = require('./mockData.js');
class User {
  constructor(user) {
    this.id = user.id;
    console.log("user id:",this.id);
    this.name = user.first_name;
  }

  fetchTasks(){
    return mockData.tasks[this.id]
  }
}

module.exports = User;
