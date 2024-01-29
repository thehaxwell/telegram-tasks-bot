const Tasks = require('./tasks');
const mockData = require('./mockData.js')

test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

test('buildTasksOverviewString works', () => {
  const tasks = new Tasks(mockData.tasks[6883659363]);
  expect(tasks.buildTasksOverviewString())
    .toBe([
      '=> You have 1 tasks due today:',
      ' * do something tomorrow\n',
      '=> You have 1 other tasks due in a week:',
      ' * Finish this task too',
    ].join('\n'));
});
