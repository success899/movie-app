import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import './FavoritePage.css';
import { Button } from 'antd';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
      Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setFavorites(response.data.info)
            } else {
                alert('Favorite 정보를 가져오기 실패!')
            }
        })
    }, [])
    
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

                    {Favorites.map((info, index) => (
                        <tr key={index}>
                            <td>{info.movieTitle}</td>
                            <td>{info.movieRuntime} mins</td>
                            <td><Button>Remove</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default FavoritePage