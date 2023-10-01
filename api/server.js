import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import userRouter from './routes/user.js';
import mongoDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';


// express init
const app = express()

// dotenv config and init
dotenv.config()
const PORT = process.env.SERVER_PORT || 5000

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// router setup
app.use('/api/v1/user', userRouter)

//custom error handler
app.use(errorHandler)

app.listen(PORT, ()=> {
    mongoDB()
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
})