import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import {API_URL, API_KEY, IMAGE_URL} from '../../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';

import {Row} from 'antd';

function MovieDetail() {

    let movieId = useParams().movieId;
    // let {movieId} = useParams();    

    const [Movie, setMovie] = useState([])
    const [MovieCasts, setMovieCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])

    useEffect(() => {

        let endpointCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        Axios.post('/api/comment/getComments', movieId)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCasts)
            .then(response => response.json())
            .then(response => {
                setMovieCasts(response.cast)
            })

    }, [movieId])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

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

            <div style={{display:'flex', justifyContent:'flex-end'}}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
            </div>

            {/* Movie Info */}
            <MovieInfo 
                movie={Movie}
            />

            <br />
            {/* Actors Grid */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                <button onClick={toggleActorView}>Actor View</button>
            </div>
            {ActorToggle &&
                <Row gutter={[16,16]}>
                    {MovieCasts && MovieCasts.map((cast, index) =>(
                        <React.Fragment key={index}>
                            <GridCards 
                                detailpage
                                image={cast.profile_path ?
                                    `${IMAGE_URL}w500${cast.profile_path}` : null}
                                CastName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            }  
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie moiveId={movieId} userId={localStorage.getItem('userId')} />
            </div>

            {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
        </div>
            
    </div>
    )
}

export default MovieDetail