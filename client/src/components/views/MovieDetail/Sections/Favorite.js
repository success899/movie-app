import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteCount, setFavoriteCount] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() =>{

        let variables = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoritecount',variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteCount(response.data.favoritecount)
                }
                else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited',variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }
                else {
                    alert('정보를 가져오는데 실패했습니다.')
                }
            })
    },[userFrom, movieId])

    return (
    <div>
        <button>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteCount}</button>        
    </div>
    )
}

export default Favorite