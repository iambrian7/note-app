var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var noteSchema = new mongoose.Schema({
    name: String,
    title: String,
    comment: String,
    tags: String,
  displayDate: String,
    dateNoteAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
