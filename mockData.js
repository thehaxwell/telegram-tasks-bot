function getTodaysDatePlusDays(days){
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days)
}

module.exports = {
  users: {
    '6883659363': {
      activeTask: null,
    },
  },
  tasks: {
    '6883659363': [
      {
        name: 'Make a Telegram bot',
        dueDate: getTodaysDatePlusDays(1),
        dateDone: getTodaysDatePlusDays(0),
        id: 'fj2038wfj',
      },
      {
        name: 'eat cheese',
        dueDate: getTodaysDatePlusDays(1),
        id: 'df83c03jc',
      },
      {
        name: 'clean my room whenever',
        id: 'fj3209finby',
      },
      {
        name: 'Finish this task too',
        dueDate: getTodaysDatePlusDays(2),
        id: 'jf1j93cJK',
      },
    ],
  }
};
