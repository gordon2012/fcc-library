import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './index';

import Layout from './components/Layout';
import Card from './components/Card';
import BookList from './components/BookList';
import Code from './components/Code';
import Form from './components/Form';
import Input from './components/Input';
import Button from './components/Button';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono|Ubuntu:400,700&display=swap');

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0 1rem;
        background: #fae8f5;
        font-family: "Ubuntu", "Helvetica", sans-serif;
    }
`;

const Title = styled.h1`
    text-align: center;
`;

const List = styled.ul``;

const App = () => {
    const [books, setBooks] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/api/books`);
            const data = await res.json();
            setBooks(data);
        })();
    }, []);

    const handleSubmit = async input => {
        const res = await fetch(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        const data = await res.json();
        setBooks(prevState => [...prevState, { ...data, commentcount: 0 }]);
    };

    const handleDelete = async id => {
        await fetch(`${BASE_URL}/api/books/${id}`, {
            method: 'DELETE',
        });
        setBooks(prevState => prevState.filter(book => book._id !== id));
    };

    const handleDeleteAll = async () => {
        await fetch(`${BASE_URL}/api/books`, {
            method: 'DELETE',
        });
        setBooks([]);
    };

    return (
        <>
            <GlobalStyle />
            <Layout>
                <Title>Personal Library</Title>

                <Card>
                    <h3>User Stories</h3>
                    <List>
                        <li>
                            Nothing from my website will be cached in my client.
                        </li>
                        <li>
                            The headers will say that the site is powered by
                            'PHP 4.2.0' even though it isn't (as a security
                            measure).
                        </li>
                        <li>
                            I can post a title to <Code inline>/api/books</Code>{' '}
                            to add a book and returned will be the object with
                            the title and a unique _id.
                        </li>
                        <li>
                            I can get <Code inline>/api/books</Code> to retrieve
                            an array of all books containing title, _id, and
                            commentcount.
                        </li>
                        <li>
                            I can get <Code inline>{`/api/books/{id}`}</Code> to
                            retrieve a single object of a book containing
                            _title, _id, & an array of comments (empty array if
                            no comments present).
                        </li>
                        <li>
                            I can post a comment to{' '}
                            <Code inline>{`/api/books/{id}`}</Code> to add a
                            comment to a book and returned will be the books
                            object similar to get{' '}
                            <Code inline>{`/api/books/{id}`}</Code> including
                            the new comment.
                        </li>
                        <li>
                            I can delete{' '}
                            <Code inline>{`/api/books/{_id}`}</Code> to delete a
                            book from the collection. Returned will be 'delete
                            successful' if successful.
                        </li>
                        <li>
                            If I try to request a book that doesn't exist I will
                            be returned 'no book exists'.
                        </li>
                        <li>
                            I can send a delete request to{' '}
                            <Code inline>/api/books</Code> to delete all books
                            in the database. Returned will be 'complete delete
                            successful' if successful.
                        </li>
                        <li>
                            All 6 functional tests required are complete and
                            passing.
                        </li>
                    </List>
                </Card>

                <Card>
                    <h3>Example Usage</h3>
                    <Code>GET /api/books</Code>
                </Card>

                <Card>
                    <h3>Example Return</h3>
                    <Code box>
                        {[
                            {
                                _id: '5de0afe811a9c749502997b7',
                                title: 'The Necronomicon',
                                commentcount: 7,
                            },
                            {
                                _id: '5de0b01011a9c749502997b8',
                                title: 'Harry Potter',
                                commentcount: 2,
                            },
                        ]}
                    </Code>
                </Card>

                <Title as="h2">Front-End</Title>

                <Card>
                    <h3>Add New Book</h3>
                    <Form onSubmit={handleSubmit}>
                        <Input required name="title" title="Title" />
                        <Button type="submit">Add Book</Button>
                    </Form>
                </Card>

                <Card>
                    <h3>Books</h3>

                    <BookList
                        books={books}
                        onDelete={handleDelete}
                        onDeleteAll={handleDeleteAll}
                    />
                </Card>
            </Layout>
        </>
    );
};

export default App;
