window.onload = () => {
    
    init();

    function init() {
        const txtLongUrl = document.getElementById('longUrl');
        const btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.addEventListener('click', () => {
            let longUrl = txtLongUrl.value

            if (longUrl.indexOf('http://') != -1) {
                parseData = txtLongUrl.value.replace('http://', '');
                longUrl = parseData;
            }
            if (longUrl.indexOf('https://') != -1) {
                parseData = txtLongUrl.value.replace('https://', '');
                longUrl = parseData;
            }

           urlShortener(longUrl)
                .then(data => {
                    if (!data) {
                        msg = "Invalid URL! Try again!";
                        addErrorMessageInDiv(msg);
                    } else {
                        console.log("createShortUrl check");
                        console.log(data);
                        processedUrl = 'http://localhost:8000/' + data.shortUrl;
                        addShortUrlInDiv(processedUrl);
                    }
                });
        });
    }

    function urlShortener(url) {
        return new Promise((resolve, reject) => {
            const host = 'http://localhost:8000/urlshort/createShortUrl'
            fetch(host, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'longUrl': url
                })
            }).then(result => {
                console.log("result exists");
                result.json()
                    .then(data => {
                        resolve(data);
                    })
            }).catch(err => {
                    console.log("catch error");
                    console.log(err);
                    reject(err);
                });
        });
    }

    function addShortUrlInDiv(shortUrl) {
        const txtShortUrl = document.getElementById('shortUrl');
        txtShortUrl.innerHTML = '<a href="' + shortUrl + '" class="btn btn-light" role="button">' + shortUrl + '</a>';
    }

    function addErrorMessageInDiv(msg) {
        const txtShortUrl = document.getElementById('shortUrl');
        txtShortUrl.innerHTML = '<a href="' + msg + '" class="btn btn-light" role="button">' + shortUrl + '</a>';
    }
}