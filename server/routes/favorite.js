const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================//
//            Favorite             //
//=================================//

router.post('/favoritecount', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err)
        
        // 그 다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({success: true, favoritecount: info.length})
        })    
})




module.exports = router;