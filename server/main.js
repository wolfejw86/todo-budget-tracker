import { Meteor } from 'meteor/meteor';
import Tasks from '/imports/api/tasks';

function insertTask(text) {
  Tasks.insert({ text, createdAt: new Date() })
}

Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
