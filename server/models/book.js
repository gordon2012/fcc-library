const bookSchema = {
    title: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: String,
        },
    ],
};

module.exports = bookSchema;
