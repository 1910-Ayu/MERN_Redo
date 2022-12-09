const express = require('express');
const notes = require('./data');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const userRouter = require('./routes/user');
const noteRouter = require('./routes/notes');
const dbConnect = require('./config/db');
dbConnect();
app.use(express.json());
app.use('/user',userRouter);
app.use('/note',noteRouter);
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})