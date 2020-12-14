const mongoose = require("mongoose");
const UrlModel = mongoose.model("UrlModel");
function baseString(){};

baseString.encode = function encode(param) {
    const codec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');

    if (param === 0) return 0;
    let result = [];
    while (param > 0) {
        result = [codec[param % 62], ...result];
        param = Math.floor(param / 62);
    }
    return result.join('');
}

baseString.findOneByBase62 = async function findOneByBase62(encodedStr) {
    // decode
    const codec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');
    const idx = encodedStr.split('')
        .reverse()
        .reduce((prev, curr, i) => prev + codec.indexOf(curr) * (62 ** i), 0);
    console.log("baseString decode idx: ",idx);

    // find
    return new Promise(async (resolve, reject) => {
        await UrlModel.findOne({ idx: idx })
        .then((data) => {
            console.log("findOneByBase isdata check");
            console.log(data);
            resolve(data);
            if (data == null) {
                resolve();
            }else{
                reject();
            }
        });
    });
}

module.exports = baseString;