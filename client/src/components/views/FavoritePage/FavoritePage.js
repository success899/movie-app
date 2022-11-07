import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './FavoritePage.css';
import { Button, Popover } from 'antd';
import {IMAGE_URL} from '../../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoriedMovie()
    }, [])

    const fetchFavoriedMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.info)
            } else {
                alert('Favorite 정보를 가져오기 실패!')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }
        Axios.post('/api/favorite/removeFavorite', variables)
            .then(response => {
                if(response.data.success){
                    fetchFavoriedMovie()
                } else {
                    alert('Favorite 지우기 실패!')
                }
            })
    }

    const renderTitle = Favorites.map((info, index) => {

        const content = (
            <div>
                {info.moviePost ? <img src={`${IMAGE_URL}w500${info.moviePost}`} alt="Moive-Post"/> : "No Image"}
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${info.movieTitle}`}>
                <td>{info.movieTitle}</td>
            </Popover>
            <td>{info.movieRuntime} mins</td>
            <td><Button onClick={()=>onClickDelete(info.movieId, info.userFrom)}>Remove</Button></td>
        </tr>
    })
    
    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>

                    {renderTitle}

                </tbody>
            </table>
        </div>
  )
}

export default FavoritePage