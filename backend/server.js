const express = require('express');
const cors= require('cors')
// const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
const userController=require('./routes/user');
const userRouter = require('./routes/user');
/**חיבור ל DB */
require('./config/db');

// const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(
    cors({
        origin:['http://localhost:4000'],
        methods:['GET','POST','PUT','DELETE','PATCH'],
        credentials:true

    })
)


app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
app.use('/user',userRouter)

const PORT = process.env.PORT || 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
