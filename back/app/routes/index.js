const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const postRoutes = require("./post");
const likeRoutes = require("./like");


// add to params
router.use("/auth", userRoutes); // auth routes
router.use("/post", postRoutes); // sauce routes
router.use("/post", likeRoutes); // like routes

module.exports= router;
