const express = require('express');
const notes = require('./data');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Api running");
})

app.get('/api/notes',(req,res)=>{
    res.json(notes);
})

app.get('/api/notes/:id',(req,res)=>{
    const note = notes.find((n)=> n._id===req.params.id)
    res.send(note);
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})