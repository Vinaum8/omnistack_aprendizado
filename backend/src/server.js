const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('ConnectRoom', box => {
        socket.join(box);
    })
});

app.use((req, res) => {
    req.io = io;

    return next();
});

mongoose.connect(
    "mongodb+srv://omnistack:omnistack@cluster0-vf53x.mongodb.net/omnistack?retryWrites=true", 
    {
    useNewUrlParser: true
    }
);

app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));
server.listen(3333);
