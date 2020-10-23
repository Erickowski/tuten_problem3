import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../context/auth/authContext";
import Book from "./Book";

import "../css/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  const { token } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    const getBooks = async () => {
      if (token) {
        try {
          const result = await Axios.get(
            "https://dev.tuten.cl/TutenREST/rest/user/contacto@tuten.cl/bookings",
            {
              params: {
                current: true,
              },
              headers: {
                adminemail: "testapis@tuten.cl",
                token,
                app: "APP_BCK",
              },
            }
          );
          setBooks(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getBooks();
  }, [token]);

  if (!token) {
    history.push("/");
  }

  return (
    <div className="home__container">
      <h2>Libros actuales</h2>
      <div className="books__container">
        {books.length === 0 && <p>Cargando...</p>}
        {books.map((book) => (
          <Book key={book.bookingId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
