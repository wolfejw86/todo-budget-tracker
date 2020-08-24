import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { check, Match } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';



const TaskSchema = new SimpleSchema({
  _id: String,
  text: String,
  checked: {
    type: Boolean,
    defaultValue: false,
  },
  createdAt: {
    type: Date,
  },
});

export const allowedColorClasses = [
  'bg-yellow-200',
  'bg-red-200',
  'bg-green-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-orange-300'
]

const ListSchema = new SimpleSchema({
  title: String,
  bgColor: { type: String, allowedValues: allowedColorClasses },
  tasks: [TaskSchema],
  deleted: [TaskSchema],
  isDeleted: { type: Boolean, defaultValue: false },
  owningFamily: String,
  createdAt: Date,
});

const existsAndHasTasks = Match.Where(maybeList => {
  return !!maybeList && maybeList.tasks.length > 0;
});

const Lists = new Mongo.Collection('lists');

Lists.attachSchema(ListSchema);

if (Meteor.isServer) {
  const getOwnFamily = () => Meteor.call('family.getOwn', { _id: 1 });

  Meteor.publish('lists', function () {
    const family = getOwnFamily();

    return Lists.find({ owningFamily: family._id, isDeleted: false });
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
        deleted: [],
      };

      ListSchema.validate(list);

      Lists.insert(list);
    },
    updateTaskCompletion(taskId, listId, checked) {
      check(taskId, String);
      check(listId, String);
      check(checked, Boolean);

      const family = getOwnFamily()

      Lists.update({ owningFamily: family._id, _id: listId, 'tasks._id': taskId }, {
        $set: { 'tasks.$.checked': checked }
      });
    },
    deleteTask(taskId, listId) {
      check(taskId, String);
      check(listId, String);

      const family = getOwnFamily();

      const listQuery = { owningFamily: family._id, _id: listId };
      const list = Lists.findOne(listQuery, { fields: { tasks: 1 } });

      check(list, existsAndHasTasks);

      const taskToDelete = list.tasks.find(t => t._id === taskId);

      Lists.update(listQuery, {
        $pull: { tasks: { _id: taskId } },
        $push: { deleted: taskToDelete }
      });
    },
    updateListColor(listId, bgColor) {
      check(listId, String);
      check(bgColor, String);

      const family = getOwnFamily();

      Lists.update({ owningFamily: family._id, _id: listId }, { $set: { bgColor } })
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
            _id: Random.id(),
            text: taskText,
            checked: false,
            createdAt: new Date(),
          },
        },
      });
    },
  });
}

export default Lists;
