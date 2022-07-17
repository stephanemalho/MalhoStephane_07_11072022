const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config'); // multer configuration

// create routes posts
router.post("/", auth, multer, postCtrl.createPost); // create one post
router.get("/:id", auth, postCtrl.readPost); // get one post by id
router.get("/", auth, postCtrl.readAllPosts); // get all posts
router.put("/:id", auth, multer, postCtrl.updatePost); // update one post by id
router.delete("/:id", auth, multer, postCtrl.deletePost); // delete one post by id
router.post("/:id/report", auth, postCtrl.reportPost); // report a post by id

module.exports = router;

