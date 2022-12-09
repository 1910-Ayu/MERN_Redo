const mongoose = require('mongoose');

const noteSchema = mongoose.model({
    content:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true,
});

const Note = mongoose.model("Note", noteSchema);
module.exports= Note;