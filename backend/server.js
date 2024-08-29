const express = require('express');
const cors= require('cors')
// const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const chatRouter = require('./routes/chatRouter');
const messageRoutes = require('./routes/messageRoutes');


const { chats } = require("./data/data")

// const webserver = express()
// const { WebSocketServer} = require('ws')
// const sockserver = new WebSocketServer({ port: 8080 })


// sockserver.on('connection', ws => {
//     console.log('New client connected!')
//     ws.send('connection established')
//     ws.on('close', () => console.log('Client has disconnected!'))
//     ws.on('message', data => {
//     sockserver.clients.forEach(client => {
//         console.log(`distributing message: ${data}`)
//         client.send(`${data}`)
//     })
//  })
//  ws.onerror = function () {
//    console.log('websocket error')
//  }
// })


/**חיבור ל DB */
require('./config/db');

// const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(
    cors({
        origin:['http://localhost:5173','http://localhost:4002','http://localhost:5002'],
        methods:['GET','POST','PUT','DELETE','PATCH'],
        credentials:true

    })
)



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/tasks',taskRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message', messageRoutes)

app.get("/api/chat",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find((c)=>c._id===req.params.id)
    res.send(singleChat)
})

const PORT = process.env.PORT || 3040;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:['http://localhost:5173','http://localhost:4002','http://localhost:5002']
    },
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io!!");
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected")
    })
    
    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined Room"+room);
    });

    socket.on('new message', (newMessageRecieved)=>{
        let chat = new newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.users not defined');
        chat.users.forEach(user => {
            if (user._id== newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved)
        });
    })

})