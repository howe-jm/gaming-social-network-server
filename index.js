const app = require('./app');
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connected');
});

server.listen(PORT, () => console.log(`Express is running on port ${PORT}!`));
