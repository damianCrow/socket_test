const io = require('socket.io')();
const port = 8000;
const WebSocket = require('ws');

const ws = new WebSocket('wss://echo.websocket.org/', {
  origin: 'https://websocket.org'
});

ws.on('open', function open() {
  console.log('connected');
});

ws.on('close', function close() {
  console.log('disconnected');
});

io.on('connection', (client) => {
  client.on('sendMessage', (message) => {
  	console.log('sendMessage' + message);
    ws.send(message);
  });

  ws.on('message', function incoming(message) {
  	console.log('getMessage' + message);
  	client.emit('getMessage', message);
	});
});

io.listen(port);
console.log('listening on port ', port);