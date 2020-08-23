import { useTracker } from "meteor/react-meteor-data";

import React from "react";
import { Task } from "./Task";
import Tasks from "../api/tasks";

export const List = () => {
  const tasks = useTracker(() => Tasks.find({}).fetch());

  return (
    <ul
      style={{ minHeight: 250, transform: "rotate(1deg)" }}
      className="w-64 p-8 shadow-md bg-yellow-200 rotate-45"
    >
      {tasks.map((t, i) => (
        <Task key={i} task={t} />
      ))}
    </ul>
  );
};
