import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

// Connecting to database
mongoose
    .connect(process.env.MONGO)
    .then(()=> {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.log(error);
    });

// Using express.js to create a web server 
const app = express();
app.use(express.json())
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// Api - client req, server response
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);