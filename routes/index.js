var express = require('express');
var router = express.Router();

// mongoose and DB models
var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var Travel = mongoose.model('Travel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET all travels
router.get('/travels', function(req, res, next) {
    Travel.find(function(err, travels) {
        if(err) {return next(err);}
        res.json(travels);
    });
});


// POST a travel
router.post('/travels', function (req, res, next) {
  var travel = new Travel(req.body);

  travel.save(function(err, travel) {
      if(err) {return next(err);}
      res.json(travel);
  });
});


module.exports = router;