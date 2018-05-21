const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const NotesSchema = new Schema({
    title: {
        type: String
    },
    body:{
        type: String
    }
});

//Create collection and add schema
let Note = mongoose.model('Note', NotesSchema);

module.exports = Note;