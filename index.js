/*
* Primary file for the API
*
*/
// Dependencies

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The Server shoudl respond to all requests with a string
var server = http.createServer(function (req, res) {
    // Get URL and Parse it
    var parsedUrl = url.parse(req.url, true);

    //Get the Path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the Query String
    var queryStringObject = parsedUrl.query;

    //Get the Path
    var method = req.method.toLowerCase();

    //Get the headers as an objectz
    var headers = req.headers;

    //Get the Payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });

    req.on('end',function(){
        buffer += decoder.end();

        //Choose the handler this request to go to. If one is not found use the notFound handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath]: handlers.notFound;

        //Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        //Route the request to the handler specified in the router
        chosenHandler(data,function(statusCode,payload){
            // Use the statusCode called back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default to an empty object 
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log('Returning this response: ',statusCode, payloadString);
        });
    });
});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000 now");
});

//Define Handlers
var handlers = {};

//Sample Handler
handlers.sample = function(data,callback){
    //Callback a http status code, and a payload object
    callback(406,{'name' : 'sample handler'});
};

//Not a handler
handlers.notFound = function(data,callback){
    callback(404);
};

//Define a request Router
var router = {
    'sample' : handlers.sample
};