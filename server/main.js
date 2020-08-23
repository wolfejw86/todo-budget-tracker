import { Meteor } from 'meteor/meteor';
import Tasks from '/imports/api/tasks';
import '../imports/api/family';
import '../imports/api/lists';
import { Accounts } from 'meteor/accounts-base';

export function insertTask(text) {
  Tasks.insert({ text, createdAt: new Date() })
}

Meteor.startup(() => {
  console.log('server starting at %s', new Date().toLocaleString())
});


/* eslint-disable no-console */

export function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });

  console.log('user created')
}


