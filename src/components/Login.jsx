import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import "../css/Login.css";

import AuthContext from "../context/auth/authContext";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { obtenerToken } = useContext(AuthContext);

  const history = useHistory();

  const submitLogin = async (e) => {
    e.preventDefault();
    if (user.trim() === "" || password.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError(false);
    try {
      const result = await Axios.put(
        `https://dev.tuten.cl/TutenREST/rest/user/${user}`,
        [],
        {
          headers: {
            app: "APP_BCK",
            password,
          },
        }
      );
      obtenerToken(result.data.sessionTokenBck);
      history.push("/home");
    } catch (error) {
      setError("Usuario no valido o contraseña incorrecta.");
    }
  };

  return (
    <form onSubmit={submitLogin}>
      <h1>Login</h1>
      {error && <p>{error}</p>}
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

export default Login;
