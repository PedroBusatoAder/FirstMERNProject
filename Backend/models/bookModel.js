import mongoose, { mongo } from "mongoose"

// No need for and ID since this will be handled automatically by MongoDB
const bookSchema = mongoose.Schema( // We define the structure for the documents in our collection!
    {
        title: {                    // Title will be the first property for our documents
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
    );


export const Book = mongoose.model('Book', bookSchema) // We create our Book model with the Schema we have designed for it