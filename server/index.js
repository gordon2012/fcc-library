const express = require('express');
const cors = require('cors');
const nocache = require('nocache');

const connect = require('./connect');
const bookSchema = require('./models/book');

const app = express();
const origin =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : 'https://library.gordondoskas.com';
app.use(cors({ origin }));
app.use(express.json());
app.use(nocache());
app.set('etag', false);
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP 4.2.0');
    next();
});

app.post('/api/books', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const created = await Book.create({ title: req.body.title });
        const book = await Book.findOne({ _id: created._id }, 'title');
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const books = await Book.find({}, 'title comments');

        const countBooks = books.map(book => ({
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length,
        }));

        res.status(200).json(countBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const book = await Book.findOne(
            { _id: req.params.id },
            'title comments'
        );
        res.status(200).json(book);
    } catch (error) {
        res.status(200).json(null);
    }
});

app.post('/api/books/:id', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { comments: req.body.comment } },
            { fields: 'title comments', new: true }
        );
        res.status(200).json(book);
    } catch (error) {
        res.status(200).json('no book exists');
    }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const removed = await Book.findOneAndRemove({ _id: req.params.id });
        if (!removed) {
            return res.status(200).json('no book exists');
        }
        res.status(200).json('delete successful');
    } catch (error) {
        res.status(200).json('no book exists');
    }
});

app.delete('/api/books', async (req, res) => {
    try {
        const Book = await connect('book', bookSchema);
        const removed = await Book.deleteMany({});

        if (!removed) {
            return res.status(200).json('could not delete all books');
        }

        res.status(200).json('complete delete successful');
    } catch (error) {
        res.status(200).json('could not delete all books');
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
