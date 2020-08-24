import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import Lists from "../../../api/lists";
import { TextInput } from "../../components/TextInput";
import { List } from "./List";

const CreateListForm = () => {
  const [listTitle, setListTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const createList = () => {
    if (!listTitle) {
      return setErrors((errors) => {
        errors.push("List title is required");

        return errors;
      });
    }

    Meteor.call('createList', listTitle)
  };

  return (
    <form
      className="flex flex-col justify-center content-center"
      onSubmit={(e) => {
        e.preventDefault();
        createList();
      }}
    >
      <ul>
        {errors.map((e) => {
          return <li className="text-red-600">{e}</li>;
        })}
      </ul>
      <label className="text-center">New List Title</label>
      <div className="w-full flex justify-center">
        <input
          className="p-4 w-1/3 border border-gray-300 rounded-sm"
          onChange={(e) => {
            const val = e.target.value;
            setListTitle(val);
            setErrors([]);
          }}
        />
      </div>

      <button className="p-4">+ Create List</button>
    </form>
  );
};

export const ListsPage = () => {
  const lists = useTracker(() => {
    Meteor.subscribe("lists");

    return Lists.find({}).fetch();
  });

  if (!lists.length) {
    return (
      <div className="flex flex-col justify-center content-center">
        <h1 className="text-center text-xl">Looks like you have no lists!</h1>
        <CreateListForm />
      </div>
    );
  }

  return (
    <>
    <CreateListForm />
    <div className="flex justify-evenly flex-wrap">
      
      {lists.map((l) => {
        return <List key={l._id} list={l} />;
      })}
    </div>
    </>
  );
};
