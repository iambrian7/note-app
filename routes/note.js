/**
 * Created by bkc on 12/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/noteModel')//(mongoose);

/* GET home page. */
router.get('/', function(req, res, next) {
  Note.find({}).sort({ dateNoteAdded : -1}).exec(function(err, notes){ //... });
 // Note.find().sort([['dateNoteAdded', 'descending']]).all(function (err, notes) {
    // do something with the array of posts
  // });
  //   Note.find({},{
  //     skip:0, // Starting Row
  //     limit:10, // Ending Row
  //     sort:{
  //       dateNoteAdded: -1 //Sort by Date Added DESC
  //     }
  //   },function (err, notes) {
        if (err) {
            console.log('found accounts error')
            return res.status(500).json({
                message: 'Error when getting notes.',
                error: err
            });
        }
        //var text = text.replace(/&quot;/g, '\\"');  // fix the quote problem
      //  console.log('listing found for notes')
   // console.log('coment: ' + JSON.stringify(notes,null,4))//nodes)
       // return res.json(notes);
       // res.render('index', { title: 'Notes for Brian', notes: notes });
       // res.json(200, notes);  //  express deprecated res.json(status, obj): Use res.status(status).json(obj) instead routes\note.js:34:13
        res.status(200).json(notes)
    });
});

router.post("/delete/:id", deleteUser); 

function deleteUser(req,res){
    console.log("deleting id= " + req.params.id)
    Note.findById(req.params.id).remove().exec(function(err){
        console.log("deleting id= " + req.params.id)
         if (!err) {
                console.log('Removed Successfully');
        }
        else {
                console.log('Error in removing the entry');
        }
    });
}

router.post('/', function(req, res, next) {
 // console.dir('hostname: ' + req.hostname)
  var timestamp = new Date();
// console.log('body=' + req.body.comment)
  //var commentBreaks = req.body.comment.replace(/\n\r?/g, '<br />');
    Note.create(
        {   name: req.body.name,
            title: req.body.title,
          //  comment: commentBreaks, //req.body.comment,
            comment: req.body.comment,
            tags: req.body.tags,
          // displayDate: timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString()
          displayDate: timestamp.toLocaleDateString() + " " + req.body.time
        }, function (err, note) {
            if (err) return handleError(err);
            // saved!
           // console.log('note saved with create: ' + JSON.stringify(note,null,4))
        })
    res.redirect("/")
});

module.exports = router;
