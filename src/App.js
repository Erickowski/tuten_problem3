import React, { useState } from "react";
import Axios from "axios";
import "./css/App.css";

const App = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();
    console.log("Iniciar sesion");
  };

  return (
    <form onSubmit={submitLogin}>
      <h1>Login</h1>
      <div>
        <label htmlFor="user">Usuario: </label>
        <input
          type="text"
          name="user"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Iniciar sesion" />
    </form>
  );
};

export default App;
