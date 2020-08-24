import { Meteor } from 'meteor/meteor';
import '../imports/api/family';
import '../imports/api/lists';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  console.log('server starting at %s', new Date().toLocaleString());
});

/* eslint-disable no-console */

export function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email,
    password,
  });

  console.log('user created');
}
