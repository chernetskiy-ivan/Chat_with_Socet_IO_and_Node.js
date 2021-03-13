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


users = []
connections = []

//отслеживаем событие connection(выкидывается при заходе на сайт)
//socket - объект подключения(будем встраивать его в масси connections)
io.sockets.on('connection',function(socket){
    console.log('Успешное соединение')
    connections.push(socket)

    //событие disconnect выкилывается когда пользователь покинул страницу(чат)
    socket.on('disconnect', function(data) {
        //удаляю 1 объект из массива по его индексу
        connections.splice(connections.indexOf(socket), 1)
        console.log('Отключились')
    })

    socket.on('send mess', data => {
        //когда сработает событье send mess
        //я вызываю событие add mess и доп парам передаю объект с данными
        io.sockets.emit('add mess', {mess: data.mess, name: data.name})
    })

})