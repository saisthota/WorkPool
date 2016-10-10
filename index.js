var rest = require('restify');
var server = rest.createServer();
var http = require('request');

var bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* Set a route for listening request */
server.get('/estimates', function(req, res, next) {
    var params = "Start latlng / End latlng";
    var token = "SERVER-TOKEN-HERE"
    http({
        url: "https://api.uber.com/v1/estimates/price?"+params,
        headers: {"Authorization": "Token "+token}
    },
        function (error, response, body) {
            if(!error && response.statusCode == 200) {
                var estimates = JSON.parse(body);
                var pool = {
                    "estimate" : estimates.prices[0].estimate,
                    "high" : estimates.prices[0].high_estimate
                };
                res.send(200, pool);
            }
        })
});

server.listen(3000, function() {
    console.log('Listening on port 3000');
});