import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState, useRef, useEffect } from "react";
import { Task } from "./Task";
import Lists, { allowedColorClasses } from "../../../api/lists";
import { TextInput } from "../../components/TextInput";

const addTask = (listId, taskText) => {
  console.log("adding task", listId, taskText);
  Meteor.call("addTask", listId, taskText);
};

const updateListColor = (listId, bgColor) => {
  console.log("updating color", listId, bgColor);
  Meteor.call("updateListColor", listId, bgColor);
};

const toggleTaskChecked = (listId, task) => {
  Meteor.call("updateTaskCompletion", task._id, listId, !task.checked);
};

const deleteTask = (listId, task) => {
  Meteor.call("deleteTask", task._id, listId);
};

const TaskAdder = ({ listId, onBlur }) => {
  const [taskText, setTaskText] = useState("");
  const inputEl = useRef();

  const submit = (e) => {
    e.preventDefault();

    addTask(listId, taskText);
    setTaskText("");
  };

  useEffect(() => {
    if (!inputEl.current) {
      return;
    }

    inputEl.current.focus();
  }, [inputEl]);

  return (
    <li>
      <form onSubmit={submit}>
        <input
          ref={inputEl}
          onKeyUp={(e) => {
            if (e.key === "Escape") {
              inputEl.current.blur();
            }
          }}
          className="p-4"
          type="text"
          onBlur={onBlur}
          onChange={(e) => setTaskText(e.target.value)}
          value={taskText}
        />
      </form>
    </li>
  );
};

const ColorPicker = ({ listId }) => {
  const [isPicking, setIsPicking] = useState(false);

  const selectColor = (color) => {
    if (!allowedColorClasses.includes(color)) {
      return;
    }

    updateListColor(listId, color);
    setIsPicking(false);
  };

  if (!isPicking) {
    return (
      <div
        className="cursor-pointer mt-5 mr-5 absolute top-0 right-0 adjustments w-4 h-4"
        onClick={() => setIsPicking(true)}
      >
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="mt-1 mr-0 absolute top-0 right-0 flex justify-between">
      {allowedColorClasses.map((c, i) => (
        <div
          key={i}
          onClick={() => selectColor(c)}
          className={`border border-black w-5 h-5 mr-2 cursor-pointer ${c}`}
        ></div>
      ))}
    </div>
  );
};

export const List = ({ list }) => {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <div
      style={{ minHeight: 250, transform: "rotate(1deg)" }}
      className={`w-64 p-8 shadow-md ${list.bgColor}  rotate-45 mb-5`}
    >
      <ColorPicker listId={list._id} />
      <ul style={{ transform: "rotate(-1deg)" }}>
        <h2 className="text-lg">{list.title}</h2>

        {list.tasks.map((t, i) => (
          <Task
            key={i}
            task={t}
            onCheck={(task) => toggleTaskChecked(list._id, task)}
            onDelete={(task) => deleteTask(list._id, task)}
          />
        ))}

        {addingTask ? (
          <TaskAdder listId={list._id} onBlur={() => setAddingTask(false)} />
        ) : (
          <li
            onClick={(e) => setAddingTask(true)}
            className="cursor-pointer p-4 text-center mt-5 text-lg"
          >
            + New Task
          </li>
        )}
      </ul>
    </div>
  );
};
