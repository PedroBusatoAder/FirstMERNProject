import React, {useEffect, useState} from "react";
import axios from 'axios';
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom"; 
import {MdOutlineAddBox} from 'react-icons/md';
import BooksTable from '../../components/home/BooksTable';
import BooksCard from '../../components/home/BooksCard'


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showType, setShowType] = useState('table');

    useEffect( () => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books') // Must match to the router requests we set up! 
            .then( (response => {
                setBooks(response.data.data);
                setLoading(false);
            }))
            .catch( (err) => {
                console.log(err);
                setLoading(true);
            });
    }, []);

    console.log(books)

    return(
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={ () => setShowType('table')}> Table </button> {/* In this case, onClick receives a method, since it is not directly excecuting an existing function */}
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={ () => setShowType('card')}> Card </button> {/* In this case, onClick receives a method, since it is not directly excecuting an existing function */}
            </div>
            
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl"/>
                </Link>
            </div>
            
            {loading ? <Spinner/> : showType === 'table' ? <BooksTable books={books}/> : <BooksCard books={books}/> } {/* We send our books as a prop to BooksTable.jsx */}
            
        </div>
    )
}

export default Home;

