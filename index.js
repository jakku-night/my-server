const express = require('express');
const fileupload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const SocketIO = require('socket.io');
const path = require('path');
const tasks = require('./routes/api/tasks');
const index = require('./routes/index');

const app = express();

const cors_options = {
    'origin': '*'
};
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.use(cors(cors_options));
app.use(fileupload());
app.use((req, res, next) => {
    console.log('[' + req.method.toUpperCase() + ']: ' + req.protocol.toLocaleLowerCase() + '://localhost:' + app.get('port') + req.originalUrl);
    next();
});

app.use(index);
app.use(tasks);

const Server = app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT', app.get('port'));
});

const Socket = SocketIO(Server);

Socket.on('connection', (socket) => {
    console.log('[Socket.IO]: New connection:', socket.id);
});