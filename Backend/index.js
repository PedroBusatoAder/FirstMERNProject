import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(234).send('Welcome to your project!')
})

// Route for saving a book
app.post("/books", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send({
                message: "Send all required fields: Title, Author, Published Year"
            });
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear  // Must match with the names chosen in the Schema!
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch(err){
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

// Route for getting ALL books from database
app.get("/books", async (req, res) => {                       // Can request the same URL since the HTTP method changes!
    try {
        const books = await Book.find({});                    // Parameter {} works as a findAll()
        return res.status(200).json({                         // We return the books to the user in json() format 
            count: books.length,
            data: books
        })         

    } catch(err){
        console.log(err);
        res.status(500).send({ message: err.message })
    }
}) 

// Route for getting a book by Id
app.get("/books/:id", async (req, res) => {                   // We add a parameter to our route! --> The : means it is compulsory!
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        return res.status(200).json(book);

    } catch(err){
        console.log(err);
        res.status(500).send({ message: err.message })
    }
})

// Route for updating a single book
app.put("/books/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send({ message: "Send all required fields: Title, Author, Published Year" })
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body);
    
        if (!result){                                                           // result variable DOES NOT return true or false, it returns an object
            return res.status(404).json({ message: "Book not found" })            
        }

        return res.status(200).send( {message : "Book update successfully"})

    } catch(err){
        console.log(err.message);
        res.status(500).send({ message: err.message})
    }
})                                                   // For updating our book we need to use the PUT() HTTP method

mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log('App connected to database')
        
        app.listen(PORT, () => {
            console.log(`App is listening on PORT: ${PORT}`) // Express server will run only if the connection with the DB was successful!
        })        
    
    })
    .catch ( (err) => {
        console.log(`There has been an error with MongoDB: ${err}`)
    })