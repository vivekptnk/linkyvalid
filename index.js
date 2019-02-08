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

    //Get the headers as an object
    var headers = req.headers;

    //Get the Payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });

    req.on('end',function(){
        buffer += decoder.end();

        //Send the Response
        res.end('Hello World! \n');

        //Log the requst path
        console.log('Request recieved with this payload: ', buffer);

    });

});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000 now");
});
