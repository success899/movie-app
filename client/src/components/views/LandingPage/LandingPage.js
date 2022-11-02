import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_URL} from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMovieImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
        .then(response => response.json())
        .then(response => {                
            setMovies([...Movies, ...response.results])
            setMainMovieImage(MainMovieImage || response.results[0])
            setCurrentPage(response.page)
        })
  }

  const loadMoreMovies = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
    fetchMovies(endpoint)
  }

  return (
    <div style={{width: '100%', margin: '0'}}>

      {/* Main Image */}
      {MainMovieImage &&
        <MainImage 
          image={`${IMAGE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      }

      <div style={{width: '85%', margin: '1rem auto'}}>

        <h2>Movies by latest</h2>
        <hr />


        {/* Movie Grid Cards */}
        <Row gutter={[16,16]}>
          {Movies && Movies.map((movie, index) =>(
            <React.Fragment key={index}>
              <GridCards 
                landingpage
                image={movie.poster_path ?
                  `${IMAGE_URL}w500${movie.poster_path}` : null}
                movieId={movie.id}
                movieName={movie.original_title}
              />
            </React.Fragment>
          ))}
        </Row>

      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={loadMoreMovies}>Load More</button>
      </div>

    </div>
  )
}

export default LandingPage