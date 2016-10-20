var rest = require('restify');
var server = rest.createServer();
var bluebird = require('bluebird');
var rp = require('request-promise');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.get('/estimates', function(req, res, next) {
    var params = "Start latlng / end latlng";
    var token = "SERVER-TOKEN-HERE"

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
});

server.listen(3000, function() {
    console.log('Listening on port 3000');
});