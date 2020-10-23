import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../context/auth/authContext";
import Book from "./Book";

import "../css/Home.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({
    filter: "",
    textFilter: "",
    typeFilter: "",
  });
  const [error, setError] = useState(false);

  const [filteredBooks, setFilteredBooks] = useState([]);

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
          setFilteredBooks(result.data);
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

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    if (
      filter.filter === "" ||
      filter.textFilter.trim() === "" ||
      (filter.filter === "bookingPrice" && filter.typeFilter === "")
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError(false);
    if (filter.filter === "bookingId") {
      setFilteredBooks(
        books.filter((book) =>
          book.bookingId.toString().includes(filter.textFilter)
        )
      );
    }
  };

  return (
    <div className="home__container">
      <h2>Libros actuales</h2>
      {error && <p>{error}</p>}
      <div className="filter__container">
        <label htmlFor="filter">Filtrar libros por: </label>
        <select
          name="filter"
          value={filter.filter}
          onChange={(e) => handleChange(e)}
        >
          <option value="">--Selecciona--</option>
          <option value="bookingId">id</option>
          <option value="bookingPrice">precio</option>
        </select>
        <label htmlFor="textFilter">Valor a buscar: </label>
        <input
          type="text"
          name="textFilter"
          value={filter.textFilter}
          onChange={(e) => handleChange(e)}
        />
        {filter.filter === "bookingPrice" && (
          <>
            <label htmlFor="typeFilter">Tipo de filtro: </label>
            <select
              name="typeFilter"
              value={filter.typeFilter}
              onChange={(e) => handleChange(e)}
            >
              <option value="">--Selecciona--</option>
              <option value="===">Igual</option>
              <option value=">=">Mayor que</option>
              <option value="<=">Menor que</option>
            </select>
          </>
        )}
        <button type="button" onClick={() => handleFilter()}>
          Filtrar
        </button>
        <button
          type="button"
          onClick={() => {
            setFilter({
              filter: "",
              textFilter: "",
              typeFilter: "",
            });
            setFilteredBooks(books);
          }}
        >
          Quitar filtros
        </button>
      </div>
      <div className="books__container">
        {books.length === 0 && <p>Cargando...</p>}
        {filteredBooks.map((book) => (
          <Book key={book.bookingId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
