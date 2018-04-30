var express = require('express');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/noteModel')//(mongoose);
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("sending vue-notes.html back............................")
    console.log(" path = " + path.join(__dirname + '../public/vue-notes.html'))
    res.sendFile(path.join(__dirname + '../public/vue-notes.html'));
    
//   Note.find({}).sort({ dateNoteAdded : -1}).exec(function(err, notes){ //... });
//         if (err) {
//             console.log('found accounts error')
//             return res.status(500).json({
//                 message: 'Error when getting notes.',
//                 error: err
//             });
//         }
//         res.render('index', { title: 'Notes for Brian', notes: notes });
//     });
});
// router.post('/note', function(req, res, next) {
//     console.log('notes.....create......... ')
//     Note.create(
//         {   name: req.body.name,
//             title: req.body.title,
//             comment: req.body.comment,
//             tags: req.body.tags
//         }, function (err, note) {
//         if (err) return handleError(err);
//         // saved!
//             console.log('note saved with create: ' + JSON.stringify(note,null,4))
//     })
//     req.redirect("/")
// });

module.exports = router;
