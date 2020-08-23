import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { Task } from "./Task";
import Lists from "../api/lists";

export const List = () => {
  const lists = useTracker(() => {
    Meteor.subscribe("lists");

    return Lists.find({}).fetch();
  });

  console.log(lists);

  return lists.length ? (
    <div>
      <ul
        style={{ minHeight: 250, transform: "rotate(1deg)" }}
        className="w-64 p-8 shadow-md bg-yellow-200 rotate-45"
      >
        <h2 className="text-lg">{lists[0].title}</h2>

        {lists[0].tasks.map((t, i) => (
          <Task key={i} task={t} />
        ))}
      </ul>
    </div>
  ) : null;
};
