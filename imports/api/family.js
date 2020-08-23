import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'


const FamilyCollection = new Mongo.Collection('families');
const familySchema = new SimpleSchema({
  name: String,
  createdBy: String,
  members: [String],
  createdAt: Date,
});


FamilyCollection.attachSchema(familySchema);



if (Meteor.isServer) {
  Meteor.methods({
    'family.create': function createFamily(name) {

      check(name, String);

      const hasFamily = FamilyCollection.find({ $or: [{ createdBy: this.userId }, { members: this.userId }] }).count()

      check(hasFamily, 0);

      const family = { name, createdBy: this.userId, members: [this.userId], createdAt: new Date() };

      familySchema.validate(family);

      FamilyCollection.insert(family);
    },
    'family.getOwn': function (projection = {}) {
      if (!this.userId) {
        throw Meteor.Error('Must be logged in to complete this operation');
      }

      return FamilyCollection.findOne({ members: this.userId }, { fields: projection });
    },
    'family.get': async function () {
      if (!this.userId) {
        throw Meteor.Error('Must be logged in to complete this operation');
      }

      const [family] = await FamilyCollection.rawCollection().aggregate([
        { $match: { $or: [{ createdBy: this.userId }, { members: this.userId }] } },
        { $lookup: { from: 'users', localField: 'members', foreignField: '_id', as: 'member2' } }
      ]).toArray();

      if (!family) {
        throw Meteor.Error('No family found')
      }

      return family
    }
  });

  Meteor.publish('families', function () {
    return FamilyCollection.find({ $or: [{ createdBy: this.userId }, { members: this.userId }] })
  })
}

export default FamilyCollection;