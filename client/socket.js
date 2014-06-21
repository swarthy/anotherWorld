var connect = function () {
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        console.info('Connection opened');
        connection.send(JSON.stringify({
            code: 2,
            text: 'hello'
        }));
    };

    connection.onerror = function (error) {
        console.error('Connection error:');
        console.log(error);
    };

    connection.onclose = function () {
        console.info('Connection closed');
    };

    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
            console.log(json);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            console.log(message);
            return;
        }
    };
}
exports.connect = connect;