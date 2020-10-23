import React, { useContext } from "react";

import AuthContext from "../context/auth/authContext";

const Home = () => {
  const { token } = useContext(AuthContext);
  return <h1>{token}</h1>;
};

export default Home;
