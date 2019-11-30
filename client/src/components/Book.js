import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '.././index';

import Card from './Card';
import Form from './Form';
import Input from './Input';
import Button from './Button';

const StyledCard = styled(Card)`
    a {
        border-radius: 3px;
        padding: 0.5rem 0.5rem;
        border: 1px solid black;
        float: right;
        &:hover {
            cursor: pointer;
        }
    }

    ul {
        margin-top: 0;
    }
`;

const StyledButton = styled(Button)`
    width: initial;
    padding: 0;
    float: right;
    font-size: 1.5em;
    background: transparent;
    border: none;
`;

const Book = ({ book, onDelete }) => {
    const [state, setState] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            open: false,
            loaded: false,
            commentcount: book.commentcount,
            comments: null,
        }
    );

    const handleOpen = async () => {
        if (state.open) {
            setState({ open: false });
        } else {
            setState({ open: true });

            if (!state.loaded) {
                setState({ loaded: true });

                if (state.commentcount > 0) {
                    const response = await fetch(
                        `${BASE_URL}/api/books/${book._id}`
                    );
                    const data = await response.json();

                    setState({
                        comments: data.comments,
                    });
                }
            }
        }
    };

    const handleSubmit = async input => {
        const res = await fetch(`${BASE_URL}/api/books/${book._id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        const data = await res.json();
        setState({
            comments: data.comments,
            commentcount: state.commentcount + 1,
        });
    };

    const handleDeleteBook = () => onDelete(book._id);

    return (
        <StyledCard variant="light">
            <h3>
                {book.title}
                <StyledButton onClick={handleOpen}>
                    {state.open ? '🔺' : '🔻'}
                </StyledButton>
            </h3>
            <p>
                {state.commentcount > 0
                    ? `Comments: ${state.commentcount}`
                    : 'No Comments'}
            </p>

            {state.open && (
                <Card>
                    {state.comments
                        ? state.comments.length > 0 && (
                              <ul>
                                  {state.comments.map((comment, i) => (
                                      <li key={i}>{comment}</li>
                                  ))}
                              </ul>
                          )
                        : state.commentcount > 0 && <p>Loading...</p>}
                    <Form onSubmit={handleSubmit}>
                        <Input required name="comment" title="Add comment" />
                        <Button type="submit">Add Comment</Button>
                    </Form>
                </Card>
            )}
            <Button onClick={handleDeleteBook}>Delete Book</Button>
        </StyledCard>
    );
};

export default Book;
