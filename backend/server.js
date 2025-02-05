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
const {Server}= require("socket.io")



/**חיבור ל DB */
require('./config/db');

// const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(
    cors({
        origin:['http://localhost:5173','http://localhost:5001'],
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

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    socket.on(`send_message`,(data)=>{
        socket.broadcast.emit("receive_message",data)
    })
    
})