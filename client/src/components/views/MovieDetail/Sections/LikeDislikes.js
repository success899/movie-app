import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import {
    LikeOutlined,
    DislikeOutlined,
    LikeFilled,
    DislikeFilled
  } from '@ant-design/icons';

function LikeDislikes(props) {
    const user = useSelector(state => state.user)

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.movie) {
        variable = { moiveId: props.moiveId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //좋아요 버튼 누른 갯수
                    setLikes(response.data.likes.length)

                    //좋아요 버튼 클릭 유무
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('실패! 다시 시도해 주세요')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    //댓글에 대한 좋아요 갯수
                    setDislikes(response.data.dislikes.length)

                    //좋아요 버튼 클릭 유무
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('실패! 다시 시도해 주세요')
                }
            })
    }, [])


    const onLike = () => {
       
        if (user.userData && !user.userData.isAuth) {
            return alert('로그인을 해주세요!');
        }

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('실패! 다시 시도해 주세요')
                    }
                })

        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('실패! 다시 시도해 주세요')
                    }
                })
        }
    }

    const onDisLike = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('로그인을 해주세요!');
        }

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('실패! 다시 시도해 주세요')
                    }
                })

        } else {

            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('실패! 다시 시도해 주세요')
                    }
                })
        }
    }

    const likefield = (LikeAction === 'liked' ? <LikeFilled onClick={onLike}/> : <LikeOutlined onClick={onLike}/>)
    const Dislikefield = (DislikeAction === 'disliked' ? <DislikeFilled onClick={onDisLike}/> : <DislikeOutlined onClick={onDisLike} />)

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {likefield}
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {Dislikefield}
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes