import React, { useState, useContext, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router";

export const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirect] = useState(false);

  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setRedirect(true);
    }
  }, [currentUser, setRedirect]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password && password.length > 6) {
      return Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          console.log(err);
          setError(err.message);
        } else {
          setEmail("");
          setPassword("");
        }
      });
    }
  };

  return redirectToHome ? (
    <Redirect to="/" />
  ) : (
    <div>
      {error && <div>{error}</div>}
      Login Page
      <form onSubmit={handleLogin}>
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
