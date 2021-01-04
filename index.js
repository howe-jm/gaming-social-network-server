const app = require('./app');
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const io = require('socket.io')(server, {
    cors: { origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' },
});

io.use(async (socket, next) => {
    socket.user_id = 1;
    next();
});

io.on('connection', (socket) => {
    console.log('a user connected');

<<<<<<< HEAD
    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    });
=======
  socket.on('message', (msg) => {
    console.log(msg);
    io.emit('message', { text: msg.text });
  });
>>>>>>> fff3b48d2c4c5f1eaf73a041a8021afdbd22e866

    // io.emit('message', new Date());
});

server.listen(PORT, () => console.log(`Express is running on port ${PORT}!`));
