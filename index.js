var rest = require('restify');
var server = rest.createServer();
var bluebird = require('bluebird');
var rp = require('request-promise');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.get('/estimates', function(req, res, next) {
    /*var params = "Start latlng / end latlng";
    var token = "SERVER-TOKEN-HERE"*/



    //https://api.uber.com/v1/estimates/time

    var estimates = {
        uri : "https://api.uber.com/v1/estimates/price?"+estimateParams,
        headers: {"Authorization": "Token "+token}
    };

    var eta = {
        uri: "https://api.uber.com/v1/estimates/time?"+etaParams,
        headers: {"Authorization": "Token "+token}
    };

    var estReq = rp(estimates);
    var etaReq = rp(eta);

    rp(estimates)
        .then(function(response) {
            var est = JSON.parse(response);
            rp(eta)
                .then(function(timeResponse) {
                    var eta = JSON.parse(timeResponse);

                        console.log("Your uberPOOL ride is " + eta.times[0].estimate/60 + " mins away, Price: " + est.prices[0].estimate);

                })
        })









/*
    http({
        url: "https://api.uber.com/v1/estimates/price?"+params,
        headers:
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
        })*/
});

server.listen(3000, function() {
    console.log('Listening on port 3000');
});