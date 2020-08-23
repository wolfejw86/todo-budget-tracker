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
    defaultValue: () => new Date()
  }
});

const ListSchema = new SimpleSchema({
  title: String,
  bgColor: String,
  tasks: [TaskSchema],
  deleted: [TaskSchema],
  owningFamily: String,
});

const Lists = new Mongo.Collection('lists');

Lists.attachSchema(ListSchema);

export default Lists;
