import React, { useContext, useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { UserContext } from "../contexts/UserContext";

const familyAggregate = new Mongo.Collection("family-aggregate");

export const Family = () => {
  const [name, setName] = useState("");

  const { family, familyMembers, createFamily } = useContext(UserContext);

  return family ? (
    <div>
      <h1>{family.name} Family</h1>

      <br />
      <br />
      <h2>Members</h2>
      <ul>
        {familyMembers.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="sm: flex justify-center">
      <form
        className="flex flex-col justify-center align-items"
        onSubmit={(e) => {
          e.preventDefault();
          createFamily(name);
        }}
      >
        <h1 className="m-10 text-lg">Create A Family</h1>
        <label htmlFor="name" className="block text-center">
          Family Name
        </label>
        <input
          type="text"
          name="name"
          className="p-4 block mb-10"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button className="bg-gray-500 p-4 block">Create Family</button>
      </form>
    </div>
  );
};
