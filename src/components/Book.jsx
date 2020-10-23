import React from "react";
import "../css/Book.css";

const Book = ({ book }) => {
  const dateBook = new Date(book.bookingTime);
  return (
    <div className="book__card">
      <h2>
        BookingId: <span>{book.bookingId}</span>
      </h2>
      <p>
        Cliente:{" "}
        <span>
          {book.tutenUserClient.firstName} {book.tutenUserClient.lastName}
        </span>
      </p>
      <p>
        Fecha de creación:
        <span>
          {`${dateBook.getDay()}/${dateBook.getMonth()}/${dateBook.getFullYear()}`}
        </span>
      </p>
      <p>
        Dirección: <span>{book.locationId.streetAddress}</span>
      </p>
      <p>
        Precio: <span>${book.bookingPrice}</span>
      </p>
    </div>
  );
};

export default Book;
