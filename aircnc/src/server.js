const express = require('express');

//para ler dados do mongodb
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

//o . é pasta atual e o / é pra entender que nao é um modulo e sim um arquivo
const routes = require('./routes');

mongoose.connect('mongodb+srv://juliana:juliana@omnistack-vedfu.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//express é um mini framework do node
const app = express();
const server = http.Server(app);
const io = socketio(server);
const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    //user_id é o id do usuario no banco e socket.id é o id da sessao desse usuario
    //entao eu estou relancionando o id do usuario ao id de sessao para poder mandar msgs em tempo real
    connectedUsers[user_id] = socket.id;
});

//precisa colocar o next para que apos colocar o dado em toda a aplicação, ele continua lendo o resto do arquivo
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    
    return next();
});

//req.query = acessar query params (para filtros)
//req.params = acessar route params(edição e delete)
//req.body = acessar corpo da requisição(criação e edição)

app.use(cors());
//para a aplicação entender respostar em json~
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);