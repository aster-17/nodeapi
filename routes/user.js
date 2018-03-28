var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

// baseurl/user/add on POST method
router.post('/add' , function(req, res) {
    userController.add(req, res);
});

// baseurl/user/login on POST method
router.post('/login' , function(req, res) {
    userController.login(req, res);
});


module.exports = router;