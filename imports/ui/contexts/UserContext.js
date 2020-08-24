import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Families from '../../api/family';

export const UserContext = React.createContext({
  user: null, family: null, familyMembers: [], getEmail: () => { }, createFamily: () => { },
});

export const UserProvider = ({ children }) => {
  Meteor.subscribe('families');

  const { user, family } = useTracker(() => ({
    user: Meteor.user(),
    family: Families.findOne({}),
  }));

  const familyMembers = useTracker(() => (family ? Meteor.users.find({ _id: { $in: family.members } }).fetch().map((u) => u.emails[0].address) : []));

  console.log(familyMembers);

  const createFamily = (name) => {
    Meteor.call('family.create', name);
  };

  const getEmail = () => user && user.emails && user.emails[0].address || null;

  return (
    <UserContext.Provider value={{
      user, getEmail, family, familyMembers, createFamily,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};
