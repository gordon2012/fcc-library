import React from 'react';

import Book from './Book';
import Button from './Button';

const BookList = ({ books, onDelete, onDeleteAll }) =>
    books ? (
        books.length > 0 ? (
            <>
                {books.map(book => (
                    <Book key={book._id} book={book} onDelete={onDelete} />
                ))}
                <Button onClick={onDeleteAll}>Delete All Books</Button>
            </>
        ) : (
            <p>No Books</p>
        )
    ) : (
        <p>Loading...</p>
    );

export default BookList;
