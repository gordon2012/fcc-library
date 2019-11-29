import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BASE_URL } from './index';

import Layout from './components/Layout';
import Card from './components/Card';
import Book from './components/Book';
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
        background: #fae8f5;
        font-family: "Ubuntu", "Helvetica", sans-serif;
    }
`;

const Title = styled.h1`
    text-align: center;
`;

// const Card = styled.section`
//     /* background: #300a24; */
//     background: ${props => (props.variant === 'light' ? 'white' : '#300a24')};
//     color: ${props => (props.variant === 'light' ? '#300a24' : 'white')};
//     padding: 1rem;
//     margin-bottom: 1rem;
//     h3 {
//         margin-top: 0;
//     }
// `;

const List = styled.ul``;

const App = () => {
    const [responses, setResponses] = React.useState([]);

    const [results, setResults] = React.useState({});
    const clearResult = name =>
        setResults(prevState => {
            const { [name]: __, ...newState } = prevState;
            return newState;
        });

    const getBooks = async () => {
        const response = await fetch(`${BASE_URL}/api/books`);
        const data = await response.json();
        setResponses(prevState => [data, ...prevState]);
        setResults(prevState => ({ ...prevState, getBooks: data }));
    };

    // new stuff

    const [books, setBooks] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`${BASE_URL}/api/books`);
            const data = await res.json();
            setBooks(data);
        })();
    }, []);

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
                    <Code>/api/test</Code>
                </Card>

                <Card>
                    <h3>Example Return</h3>
                    <Code box>
                        {{
                            hello: 'world',
                        }}
                    </Code>
                </Card>

                <Title as="h2">Front-End</Title>

                <Card>
                    <h3>
                        <Code>{`GET /api/books`}</Code>
                    </h3>

                    <Button onClick={getBooks}>GET Books</Button>

                    {results.getBooks && (
                        <>
                            <h3>Result</h3>
                            <Code box>{results.getBooks}</Code>
                            <Button onClick={() => clearResult('getBooks')}>
                                Clear
                            </Button>
                        </>
                    )}
                </Card>

                <Card>
                    <h3>Add New Book</h3>
                    <Form>
                        <Input required name="title" title="Title" />
                    </Form>
                </Card>

                <Card>
                    <h3>Existing Books</h3>

                    {/* <Card variant="light">
                        <h3>A Book</h3>
                        <p>Comments: 0</p>

                        <List>
                            <li>a comment</li>
                            <li>another comment</li>
                        </List>

                        <Form>
                            <Input
                                required
                                name="comment"
                                title="Add comment"
                            />
                        </Form>
                    </Card>

                    <Card variant="light">A Book</Card>

                    <Book
                        book={{
                            _id: '5de0afe811a9c749502997b7',
                            title: 'The Necromonicon',
                            commentcount: 2,
                        }}
                    />
                    <Book
                        book={{
                            _id: '5de0b01011a9c749502997b8',
                            title: 'Harry Potter',
                            commentcount: 0,
                        }}
                    /> */}

                    {books ? (
                        books.length > 0 ? (
                            books.map(book => (
                                <Book key={book._id} book={book} />
                            ))
                        ) : (
                            <p>No Books</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>

                {responses.length > 0 && (
                    <>
                        <Title as="h2">Responses</Title>
                        <Card>
                            {responses.map((e, i) => (
                                <Code box key={i}>
                                    {e}
                                </Code>
                            ))}
                        </Card>
                    </>
                )}
            </Layout>
        </>
    );
};

export default App;
