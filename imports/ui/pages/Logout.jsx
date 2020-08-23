import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";

export const Logout = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    Meteor.logout((err) => {
      if (err) {
        console.error(err);
        setError(err);
      }
    });
  }, []);

  return (
    <div>
      <h1>{error ? error : "You are now logged out"}</h1>
    </div>
  );
};
