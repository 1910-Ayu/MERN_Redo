const mongoose  = require("mongoose");
const Note = require("../models/note");
const User = require('../models/user');


const createNote = async(req,res)=>{
    
    const{content} = req.body;
    try{
    const newNote =await Note.create({      
        content:content,
        user:req.user.id,
    });
    res.status(200).json(newNote);
    }catch(err){
        res.status(500).json(err.message);
    }   

}

const getNoteById = async (req,res)=>{
    try{
        const noteId = req.params.id;
        const isValidId = mongoose.Types.ObjectId(noteId);
        if(!isValidId){
            res.status(500).json("Invalid Id");
        }
        const note = await Note.findById(noteId);
        if(note.user == req.user.id){
            
            res.status(200).json(note);
        }else{
            res.status(500).json("not auth");
        }
       
       
    }catch(err){
        res.status(500).json(err.message);
    }
}

const getallNotes = async(req,res)=>{
    try{
    const notes = await Note.find({user:req.user._id});
    console.log(notes);
    res.status(200).json(notes);
    }catch(err){
        res.status(500).json(err.message);
    }

} 

const updateNotes = async(req,res)=>{
    const {content} = req.body;
    try{
        const note = await Note.findById(req.params.id);
        if(note.user.toString() !== req.user._id.toString()){
            res.status(500).json("not auth");
        }
        if(note){
            note.content = content;
            const updatedNote = await note.save();
            res.status(200).json(updatedNote);
        }else{
            res.status(400).json("Note not found");
        }
    }catch(err){
        res.status(500).json(err.message);
    };
}

const deleteNote = async(req,res)=>{
    try{
    const note = await Note.findById(req.params.id);
    if(note.user.toString() !== req.user._id.toString()){
        res.status(500).json("not auth");
    }
    if(note){
        await note.remove();
        res.status(200).json("note deleted");

    }else{
        res.status(400).json("Note not found");
    }}catch(err){
        res.status(500).json(err.message);
    }
}
module.exports = {createNote,getNoteById,getallNotes,updateNotes,deleteNote};