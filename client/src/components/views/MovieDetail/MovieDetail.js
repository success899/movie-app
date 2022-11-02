import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {API_URL, API_KEY, IMAGE_URL} from '../../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail() {

    let movieId = useParams().movieId;
    // let {movieId} = useParams();    

    const [Movie, setMovie] = useState([])

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
    }, [movieId])


    return (
    <div>

        {/* Header */}
        {Movie.backdrop_path &&
            <MainImage 
            image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
            />
        }
        {/* Body */}
        <div style={{width: '85%', margin: '1rem auto'}}>

            {/* Movie Info */}
            <MovieInfo 
                movie={Movie}
            />

            <br />
            {/* Actors Grid */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                <button>Toggle Actor View</button>
            </div>


        </div>
            
    </div>
    )
}

export default MovieDetail