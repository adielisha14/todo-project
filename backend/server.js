const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
