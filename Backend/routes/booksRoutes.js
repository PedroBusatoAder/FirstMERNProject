import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a book
router.post("/", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return res.status(400).send({
                message: "Send all required fields: Title, Author, Published Year"
            });
        }
        // console.log(req.body) // Used this console.log() to verify in the VSC console that req.body was working adequately!
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear  // Must match with the names chosen in the Schema!
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch(err){
        console.log("Faced the following error when trying to create a books", err);
        res.status(500).send({ message: err.message })
    }
})

// Route for getting ALL books from database
router.get("/", async (req, res) => {                         // Can request the same URL since the HTTP method changes!
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
router.get("/:id", async (req, res) => {                   // We add a parameter to our route! --> The : means it is compulsory!
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
router.put("/:id", async (req, res) => {
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
        res.status(500).send({ message: err.message })
    }
});                                                   // For updating our book we need to use the PUT() HTTP method

// Route for deleting a single book
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({ message: "Book not found!" })
        }
        return res.status(200).send({ message: "Book deleted successfully" })

    } catch(err) {
        console.log(err.message)
        res.status(500).send({ message : err.message })
    }
});                                        // For deleting the book we don't need to send information through the body of the request as we did when creating one!

export default router;  