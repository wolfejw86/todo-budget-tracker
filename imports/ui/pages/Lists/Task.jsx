import React from "react";

export const Task = ({ task, onDelete, onCheck }) => {
  const onCheckClicked = () => onCheck(task);
  const onDeleteClicked = () => onDelete(task);

  return task.checked ? (
    <li className="p-2 flex justify-between content-center">
      <span onClick={onCheckClicked} className="line-through w-full hover:text-gray-800 cursor-pointer">
        {task.text}
      </span>
      <span onClick={onDeleteClicked} className="hover:scale-50 cursor-pointer">
        x
      </span>
    </li>
  ) : (
    <li className="p-2 flex justify-between content-center">
      <span
        onClick={onCheckClicked}
        className="hover:underline hover:text-gray-800 cursor-pointer"
      >
        {task.text}
      </span>
      <span onClick={onDeleteClicked} className="cursor-pointer">
        x
      </span>
    </li>
  );
};
