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

    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', { text: msg.text });
    });

    // io.emit('message', new Date());
});

server.listen(PORT, () => console.log(`Express is running on port ${PORT}!`));
