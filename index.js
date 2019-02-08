/*
* Primary file for the API
*
*/
// Dependencies

var http = require('http');
var url = require('url');

// The Server shoudl respond to all requests with a string
var server = http.createServer(function (req, res) {
    // Get URL and Parse it
    var parsedUrl = url.parse(req.url, true);

    //Get the Path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Get the Query String
    var queryStringObject = parsedUrl.query;

    //Send the Response
    res.end('Hello World! \n');

    //Get the Path
    var method = req.method.toLowerCase();

    //Log the requst path
    console.log('Request recieved on path: '+ trimmedPath + ' with this method: ' +method+' with these query string parameters: ',queryStringObject);

});

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000 now");
});
