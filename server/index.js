const express = require('express');
const cors = require('cors');
const nocache = require('nocache');

const connect = require('./connect');
const exampleSchema = require('./models/example');

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

app.get('/api/example', async (req, res) => {
    try {
        // const Example = await connect('example', exampleSchema);
        // const example = await Example.create({ name: 'Hello World' });
        // res.status(200).json(example.toJSON());
        res.status(200).json({ msg: 'Hello World' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
