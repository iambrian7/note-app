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
        if (err) {
            console.log('found notes error')
            return res.status(500).json({
                message: 'Error when getting notes.',
                error: err
            });
        }
        res.status(200).json(notes)
    });
});

router.post("/delete/:id", deleteUser); 

function deleteUser(req,res){
   // console.log("deleting id= " + req.params.id)
    Note.findById(req.params.id).remove().exec(function(err){
      //  console.log("deleting id= " + req.params.id)
         if (!err) {
         //       console.log('Removed Successfully');
         res.status(200).json({message:"success"})
        }
        else {
        //        console.log('Error in removing the entry');
        }
    });
  
}

router.post('/', function(req, res, next) {
 // console.dir('hostname: ' + req.hostname)
  var timestamp = new Date();
 //console.log('body=' + JSON.stringify(req.body))
 if (req.body.id ){ // if we have an id this is an update
   // // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    Note.findByIdAndUpdate(
      // the id of the item to find
      req.body.id,
      
      // the change to be made. Mongoose will smartly combine your existing 
      // document with this change, which allows for partial updates too
      req.body,
      
      // an option that asks mongoose to return the updated version 
      // of the document instead of the pre-updated one.
      {new: true},
      
      // the callback function
      (err, note) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
      }
    )
  } else {
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
  } // end of create
    res.redirect("/")
  });
  
  module.exports = router;
  