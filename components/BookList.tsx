"use client";
import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  username?: string;
}

const BookList = ({ title, books, containerClassName, username }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.length === 0 && (
          <p className="text-xl text-white">No Books to show</p>
        )}
        {books.map((book, ind) => (
          <BookCard key={ind} {...book} username={username} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
