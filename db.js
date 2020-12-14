const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/urlModel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once("open", _ => {
    console.log("mongodb is connected succesfully!");
});
db.on("error", err => {
    console.log(`Error on DB Connection : ${err}`);
});

db.UrlModel = require('./model/urlModel');

module.exports = db;