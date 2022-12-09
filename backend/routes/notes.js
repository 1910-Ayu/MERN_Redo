const { createNote, getNoteById, getallNotes, updateNotes, deleteNote } = require('../controllers/note');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.post('/create',protect,createNote);
router.get('/:id',protect,getNoteById);
router.get('/',protect,getallNotes);
router.put('/update/:id',protect,updateNotes);
router.delete('/delete/:id',protect,deleteNote);

module.exports= router;