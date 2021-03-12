const express = require('express')
const app = express()
const server = require('http').createServer(app)  //Передаю app для которого и создается самсервер
const io = require('socket.io')(server) //указываю какой сервер буду отслеживать

//указываю какой порт будет ослеживать сервер
server.listen(3000)

//прописываем отслеживание url адресов
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})