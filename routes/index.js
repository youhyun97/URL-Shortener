var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const baseString = require('../base62/baseString');

router.get('/', function (req, res, next) {
  res.render('index');
});

// shortUrl을 decode 후 나온 idx 값으로 db에서 longUrl find.
router.get("/:shortUrl", async (req, res, next) => {
  console.log("shortUrl req.body check");
  console.log(req.params);
  var shortUrl = req.params.shortUrl;
  try {
      if (shortUrl === undefined)
          throw new Error("request path 값이 존재하지 않습니다.");
      
      // shortUrl decodeing 해서 idx 있는지 찾기
      await baseString.findOneByBase62(shortUrl)
      .then(data =>{
        console.log("data check");
        console.log(data);
          if(data){
              console.log("shortUrl decode check");
              console.log(data);
              res.redirect('http://'+data.longUrl);
          }else{ // <ERROR 처리> db에 존재하지 않는 shortURL -> error 처리하기
              next(createError(404));
          }
      });
      
  } catch (error) {
      return res.json(error.message);
  }
});

module.exports = router;