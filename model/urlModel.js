const mongoose = require("mongoose");
const { Schema } = mongoose;
const UrlModel = new Schema({
    idx: {
        type: Number,
        unique: true
    },
    longUrl: {
        type: String,
        unique: true
    },
    shortUrl: {
        type: String,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

mongoose.model("UrlModel", UrlModel);