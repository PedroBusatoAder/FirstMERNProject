import {Link} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';

const BackButton = ( {destination = '/'} ) => { // In functional components, props are declared in this way, as parameters of our function! If my parent component I send destionation='home' the route to where I am redirected changes!
    return(
        <div className='flex'>
            <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
                <BsArrowLeft className='text-2x1'/>
            </Link>
        </div>
    )
}

export default BackButton;