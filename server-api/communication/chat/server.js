import socketIo from 'socket.io';

export default class ChatServer {
    constructor(app) {
        this.chatServer = app;
        this.io = socketIo(app);
        this.createChatServer = this.createChatServer.bind(this);
        this.io.on('connection', () => {
            console.log('user connected');
        });
    }

    createChatServer(req, res, next) {
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    sendMessage(req, res, next) {
        console.log(req);
        this.io.emit('message', req.body);
        res.sendStatus(200);
    }

    socket() {
        return this.io;
    }
}
