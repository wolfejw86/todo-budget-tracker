import React, { useState } from "react";
import { Accounts } from "meteor/accounts-base";

export const Signup = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (email && password && password.length > 6) {
      return Accounts.createUser({ email, password }, (error) => {
        if (error) {
          setError(error.message);
        } else {
          setEmail("");
          setPassword("");
        }
      });
    } else {
      setError(
        "Email is required and password must be longer than 6 characters"
      );
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Signup</button>
      </form>
    </div>
  );
};
