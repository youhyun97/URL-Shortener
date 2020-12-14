const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const UrlModel = mongoose.model("UrlModel");
const baseString = require('../base62/baseString');
const validUrl = require("valid-url");

// longUrl을 db에 넣고 해당하는 id -> base62로 encode -> shortUrl DB 저장
router.post('/createShortUrl', async (req, res, next) => {
    const  longUrl  = req.body.longUrl;
    
        try {
            if (longUrl === undefined)
                throw new Error("request body값이 조회되지 않음");
    
            const url = await UrlModel.findOne({ longUrl : longUrl });
            if (url) { // db에 longUrl이 있을 경우
                console.log("longUrl in DB");
                return res.status(200).json(url);
            } else { // db에 longUrl이 없을 경우
                console.log("lognUrl not in DB");
                const idx = await UrlModel.count({});
                const shortUrl = await baseString.encode(idx);
                console.log("idx: ",idx, " shortUrl: ", shortUrl);
    
                const item = new UrlModel({
                    idx : idx,
                    longUrl : longUrl,
                    shortUrl : shortUrl,
                });
                await item.save();
                return res.status(200).json(item);
            }
            // <ERROR 처리>
            // longUrl의 input값이 url이 아닌 경우 -> shortenUrl 생성하지 않고 error 출력 
    
        } catch (error) {
            console.log("createShortUrl error");
            return res
            .status(401)
            .json(error.message);
        }
    
});

module.exports = router;
