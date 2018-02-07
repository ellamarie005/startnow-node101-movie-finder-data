var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
var movieInfo = {};
const app = express();
app.use(morgan('dev'));


app.get("/", function(req, res) {
    const api = "&apikey=8730e0e";
    const tQuery = '?t=' + encodeURIComponent(req.query.t);
    var iQuery = '?i=' + req.query.i;

    if (req.query.i) {
        var url = 'http://www.omdbapi.com/' + iQuery + api;
        var key = req.query.i;
    } else if (req.query.t) {
        var url = 'http://www.omdbapi.com/' + tQuery + api;
        var key = req.query.t;
    }
    if (movieInfo[key] === undefined) {
        if (key === "/") {
            return res.status(200).send("Look somewhere else!");
        }
        axios({
                method: 'GET',
                url: url,
                responseType: 'text'
            })
            .then(function(response) {
                movieInfo[key] = response.data;
                res.status(200).json(movieInfo[key]);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json("Movie info on other link!");
            });
    } else {
        res.status(200).json(movieInfo[key]);
    }
});
module.exports = app;