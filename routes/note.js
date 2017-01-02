/**
 * Created by bkc on 12/30/2016.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('../models/noteModel')//(mongoose);
router.post('/', function(req, res, next) {
  console.dir('hostname: ' + req.hostname)
  var timestamp = new Date();
 console.log('body=' + req.body)
    Note.create(
        {   name: req.body.name,
            title: req.body.title,
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
