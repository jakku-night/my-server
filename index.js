const express = require('express');
const fileupload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const SocketIO = require('socket.io');
const path = require('path');

const app = express();

const cors_options = {
    'origin': '*'
};
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.use(cors(cors_options));
app.use(fileupload());
app.use((req, res, next) => {
    console.log(req.protocol.toUpperCase(), req.method.toUpperCase(), req.originalUrl);
    next();
});

const Server = app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT', app.get('port'));
});

const Socket = SocketIO(Server);

Socket.on('connection', (socket) => {
    console.log('[Socket.IO]: New connection:', socket.id);
});