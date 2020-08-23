import React from "react";

export const Task = ({ task, onDelete, onCheck }) => {
  return task.checked ? (
    <li className="p-2 flex justify-between ">
      <span onClick={onCheck} className="line-through w-full">
        {task.text}
      </span>{" "}
      <span onClick={onDelete} className="hover:scale-50 cursor-pointer">
        x
      </span>
    </li>
  ) : (
    <li className="p-2 flex justify-between">
      {task.text} <span>x</span>
    </li>
  );
};
