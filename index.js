var rest = require('restify');
var server = rest.createServer();
var http = require('request');
var promise = require('request-promise');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.get('/estimates', function(req, res, next) {
    /*var params = "Start latlng / end latlng";
    var token = "SERVER-TOKEN-HERE"*/

    var params = "start_latitude=37.351374&start_longitude=-121.992940&end_latitude=37.434650&end_longitude=-121.920546";
    var token = "JaFBwmbHYOT2k0-bU4HNsFfBcEN00cfZhIevShBq"

    //https://api.uber.com/v1/estimates/time

    http({
        url: "https://api.uber.com/v1/estimates/price?"+params,
        headers: {"Authorization": "Token "+token}
    },

        function (error, response, body) {
            if(!error && response.statusCode == 200) {
                var estimates = JSON.parse(body);
                if(estimates.prices[0].display_name=="POOL") {
                    var pool = {
                        "estimate": estimates.prices[0].estimate,
                        "eta": "estimated time",
                        "high": estimates.prices[0].high_estimate,
                    };
                    res.send(200, pool);
                } else {
                    res.send(404, "No uberPOOL found nearby!");
                }

            }
        })
});

server.listen(3000, function() {
    console.log('Listening on port 3000');
});