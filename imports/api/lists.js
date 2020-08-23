import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

const TaskSchema = new SimpleSchema({
  text: String,
  checked: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
  }
});

const ListSchema = new SimpleSchema({
  title: String,
  bgColor: { type: String },
  tasks: [TaskSchema],
  deleted: [TaskSchema],
  isDeleted: { type: Boolean, defaultValue: false },
  owningFamily: String,
  createdAt: Date
});

const Lists = new Mongo.Collection('lists');

Lists.attachSchema(ListSchema);

if (Meteor.isServer) {
  const getOwnFamily = () => Meteor.call('family.getOwn', { _id: 1 });

  Meteor.publish('lists', function () {
    const family = getOwnFamily()

    return Lists.find({ owningFamily: family._id })
  });

  Meteor.methods({
    createList(title, bgColor = 'bg-yellow-200') {
      const family = getOwnFamily();

      const list = {
        title,
        bgColor,
        createdAt: new Date(),
        owningFamily: family._id,
        isDeleted: false,
        tasks: [],
        deleted: []
      };

      ListSchema.validate(list);

      Lists.insert(list)
    },
    addTask(listId, taskText) {
      const family = getOwnFamily();
      const findListQuery = { _id: listId, owningFamily: family._id };
      const list = Lists.findOne(findListQuery);

      if (!list) {
        throw Meteor.Error('List not found');
      }

      Lists.update(findListQuery, {
        $push: {
          tasks: {
            text: taskText,
            checked: false,
            createdAt: new Date()
          }
        }
      });
    }
  })
}

export default Lists;
