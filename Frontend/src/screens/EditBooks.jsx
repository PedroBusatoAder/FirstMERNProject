import React, { useState, useEffect} from "react";
import BackButton from '../../components/BackButton'
import Spinner from "../../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


const EditBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect( () => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then( (response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishedYear(response.data.publishedYear);
                setLoading(false);
            })
            .catch( () => {
                setLoading(false);
                alert('An error happened! Please check console');
                console.log(err);

            })
            
    }, [])

    const handleEditBook = () => {
        const bookData = {
            title,
            author,
            publishedYear
        };

        setLoading(true);
        
        axios
            .put(`http://localhost:5555/books/${id}`, bookData) // bookData will be the body of our request! If we do not pass the second parameter we get a 400 Error, which means the server cant process the request since there is no body in it!
            .then( () => {
                setLoading(false)
                navigate('/')
            })
            .catch( (err) => {
                setLoading(false);
                alert('An error happened! Please check console');
                console.log(err);
            })
    }

    return(
        <div className="p-4">
            
            <BackButton/>
            <h1 className="text-3xl my-4"> Edit Book </h1>
            
            {loading ? <Spinner/> : ''}

            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500"> Title </label>
                    <input
                        type="text"
                        value={title}
                        onChange={ (event) => setTitle(event.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500"> Author </label>
                    <input
                        type="text"
                        value={author}
                        onChange={ (event) => setAuthor(event.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500"> Publised Year </label>
                    <input
                        type="text"
                        value={publishedYear}
                        onChange={ (event) => setPublishedYear(event.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <button className="p-2 bg-sky-300 m-8" onClick={ handleEditBook }> Save </button>
            </div>
        </div>
    )
}

export default EditBooks;
