import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteCount, setFavoriteCount] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }

    useEffect(() =>{

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
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteCount(FavoriteCount-1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 지우기 실패!')
                }
            })
        } else {
            Axios.post('/api/favorite/addFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteCount(FavoriteCount+1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 추가 실패!')
                }
            })
        }
    }

    return (
    <div>
        <Button onClick={onClickFavorite}>{Favorited? "Not Favorite : " : "Add to Favorite : "} {FavoriteCount}</Button>        
    </div>
    )
}

export default Favorite