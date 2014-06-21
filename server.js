console.logJSON = function (obj) {
    console.log(JSON.stringify(obj, null, 4));
}

var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

var mainPage = fs.readFileSync('index.html').toString();

var server = http.createServer(function (request, response) {
    
    if(request.url == "/") {
        html = fs.readFileSync("index.html", "utf8");
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(mainPage);
    } else {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        script = fs.readFileSync("data.js", "utf8");
        response.write(script);
    }
    response.end();
});

server.listen(1337, function () {
    console.log((new Date()) + " Server is listening on port 1337");
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            // process WebSocket message            
            console.logJSON(message);
            connection.send(JSON.stringify({
                a: 1,
                b: "test"
            }));
        }
    });

    connection.on('close', function (connection) {
        // close user connection
        console.log('Client disconnected');
    });
});