const express = require('express');
const router = express.Router(); 
const likePostCtrl = require('../controllers/post');
const auth = require('../middleware/auth');


// add id and like to params, check the auth middleware
router.post("/:id/like",auth, likePostCtrl.likePost);  // like a post

module.exports = router;