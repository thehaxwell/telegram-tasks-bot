function getTodaysDatePlusDays(days){
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days)
}

module.exports = {
  tasks: {
    '6883659363': [
      {
        name: 'do something tomorrow',
        dueDate: getTodaysDatePlusDays(1),
        isDone: false,
      },
      {
        name: 'Finish this task too',
        dueDate: getTodaysDatePlusDays(2),
        isDone: false,
      },
    ],
  }
};
