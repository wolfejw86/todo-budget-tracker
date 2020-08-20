import React from "react";
import { Task } from "./Task.jsx";
import Tasks from "../api/tasks";

import { useTracker } from "meteor/react-meteor-data";

export const App = () => {
  const tasks = useTracker(() => Tasks.find({}).fetch());
  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        {tasks.map((t, i) => (
          <Task key={i} task={t} />
        ))}
      </ul>
    </div>
  );
};
