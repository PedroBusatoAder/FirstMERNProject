import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js"
import cors from 'cors';


const app = express();

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS Policy
// Option 1)  Allow all origins with default of cors (*)
app.use(cors()); 

// Option 2) Allow custom origins
// app.use(cors({                                  // We allow users from a different origin (localhost:3000) to access our express server (localhost:5555)
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (req, res) => {
    console.log('Project is working!')
    return res.status(234).send('Welcome to your project!')
})

app.use("/books", booksRoutes) // For all requests coming from /books, handle them with bookRoutes!

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