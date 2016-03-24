var express = require('express');
var storage = require('node-persist');
var router = express.Router();

//storage.initSync();

/* GET users listing. */
router.get('/', function(req, res, next) {

  if(storage.getItem('users')){
    res.status('200').json(storage.getItem('users'));
  } else {
    res.status('200').json({});
  }
});

// route.get('/:username', function(req, res){
//   if(storage.getItem('users')){

//   } else {

//   }
// });

router.post('/', function(req, res){

  var users = [];
  if(!users) {

  }

  storate.setItems('users', users);
  res.status('201').json({ status: 'Created' });
});

module.exports = router;
