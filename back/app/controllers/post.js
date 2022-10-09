const Post = require("../models/post"); // import the post model
const fs = require("fs"); // file system
const jwt = require("jsonwebtoken");

exports.readPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) // find the post
    .then((post) => {
      post.imageUrl = `${req.protocol}://${req.get("host")}/` + post.imageUrl; // add the image url
      res.status(200).json(post, hateoasLinks(req, post._id)); // ok
    })
    .catch((error) => res.status(404).json({ error })); // not found
};

exports.readAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      posts = posts.map((post) => {
        post.imageUrl =
          `${req.protocol}://${req.get("host")}/` + post.imageUrl; // add image url
        const hateoasLink = hateoasLinks(req, post._id);
        return { ...post._doc, hateoasLink };
      });
      res.status(200).json(posts, hateoasLinks(req, posts._id)); // ok
    })
    .catch((error) => res.status(400).json({ error })); // bad request
};

exports.createPost = (req, res, next) => {
  const post = new Post({
    userId: req.auth.userID,
    message : req.body.message,
    imageUrl: req.file ? `images/image-url/${req.file.filename}` : `images/default-upload/logo.png`,
    likes : 0,
    dislikes : 0,
    usersLikeId : [],
    usersDislikeId : [],
  }); // create a new post
  post
    .save() // save the post
    .then(() => res.status(201).json(post, hateoasLinks(req, post._id))) // created
    .catch((error) => res.status(400).json({ error })); // bad request
};

exports.updatePost = (req, res, next) => {
  const postObject = req.file
    ? {
        imageUrl: `images/image-url/${req.file.filename}`,
      }
    : { ...req.body }; // if there is a file, add the image url to the post object
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const token = req.headers?.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const userId = decodedToken.userId;
      const isAdmin = decodedToken.isAdmin;
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "You can't update this post" }); // forbidden
      }
      try {
        if (req.body.message) {
          postObject.message = req.body.message;
        }
        if (postObject.imageUrl) {
          fs.unlinkSync(post.imageUrl); // delete the old image synchronously
        }
      } catch (error) {
        console.log(error);
      }
      Post.findByIdAndUpdate({ _id: req.params.id }, postObject , { new: true })
        .then((post) =>
          res.status(200).json(post, hateoasLinks(req, post._id))
        ) // ok
        .catch((error) => res.status(400).json({ error })); // bad request
    })
    .catch((error) => res.status(404).json({ error })); // not found
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) // find the post
    .then((post) => {
      const token = req.headers?.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
      const userId = decodedToken.userId;
      const isAdmin = decodedToken.isAdmin;
      const defaultFile = "images/default-upload/logo.png";
      if (post.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "You can't delete this post" }); // forbidden
      } else if (defaultFile === post.imageUrl) {
        // dont allow the default image to be deleted
        return res.status(203).json({ error: "You can't delete the default image" }); // non-authoritative information
      }
      fs.unlink(post.imageUrl, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(204).send()) // no content
          .catch((error) => res.status(400).json({ error })); // bad request
        });
    })
    .catch((error) => res.status(400).json({ error })); // bad request
};

exports.likePost = (req, res, next) => {
  try {
    Post.findById(req.params.id).then((post) => {
      let toChange = {};
      switch (req.body.like) {
        case -1:
          toChange = {
            $inc: { dislikes: 1 }, // add a dislike
            $push: { usersDislikeId: req.auth.userID }, // add the user to the list of users disliked
          };
          if (post["usersLikeId"].includes(req.auth.userID)) {
            toChange = {
              $inc: { dislikes: 1, likes: -1 }, // add a dislike and remove a like
              $push: { usersDislikeId: req.auth.userID },
              $pull: { usersLikeId: req.auth.userID },
            };
          }
          if (!post["usersDislikeId"].includes(req.auth.userID)) {
            Post.findByIdAndUpdate({ _id: req.params.id }, toChange, {
              new: true,
            })
              .then((newPost) => {
                res.status(200).json(newPost, hateoasLinks(req, post._id)); // ok
              })
              .catch((error) => {
                res.status(400).json({ error }); // bad request
              });
          } else {
            res.status(200).json({ message: "User already dislike the post" }); // ok
          }
          break;
        case 0:
          if (post["usersLikeId"].includes(req.auth.userID)) {
            // if the user is already liked
            Post.findByIdAndUpdate(
              { _id: req.params.id },
              {
                $inc: { likes: -1 }, // remove a like
                $pull: { usersLikeId: req.auth.userID }, // remove the user from the list of users liked
              },
              { new: true }
            )
              .then((newPost) => {
                res.status(200).json(newPost, hateoasLinks(req, post._id)); // ok
              })
              .catch((error) => {
                res.status(400).json({ error }); // bad request
              });
          }
          if (post["usersDislikeId"].includes(req.auth.userID)) {
            // if the user is already disliked
            Post.findByIdAndUpdate(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 }, // remove a dislike
                $pull: { usersDislikeId: req.auth.userID }, // remove the user from the list of users disliked
              },
              { new: true }
            )
              .then((newPost) => {
                return res
                  .status(200) // ok
                  .json(newPost, hateoasLinks(req, post._id));
              })
              .catch((error) => {
                return res.status(400).json({ error });
              });
          }
          if (
            !post["usersDislikeId"].includes(req.auth.userID) &&
            !post["usersLikeId"].includes(req.auth.userID)
          ) {
            res
              .status(200) // ok
              .json({ message: "Don't need to dislike or undislike" });
          }
          break;
        case 1:
          toChange = {
            $inc: { likes: 1 },
            $push: { usersLikeId: req.auth.userID },
          };
          if (post["usersDislikeId"].includes(req.auth.userID)) {
            toChange = {
              $inc: { dislikes: -1, likes: 1 }, // add a dislike and remove a like
              $pull: { usersDislikeId: req.auth.userID },
              $push: { usersLikeId: req.auth.userID },
            };
          }
          if (!post["usersLikeId"].includes(req.auth.userID)) {
            Post.findByIdAndUpdate({ _id: req.params.id }, toChange, {
              new: true,
            })
              .then((newPost) => {
                res.status(200).json(newPost, hateoasLinks(req, post._id)); // ok
              })
              .catch((error) => {
                res.status(400).json({ error }); // bad request
              });
          } else {
            res.status(200).json({ message: "User already like the post" }); // ok
          }
          break;
        default:
          res.status(400).json({ message: "Bad request" }); // bad request
      }
    });
  } catch (error) {
    res.status(404).json({ message: error }); // not found
  }
};

exports.reportPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post["usersWhoReportedThePost"].includes(req.auth.userID)) {
        Post.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $inc: { reports: 1 },
            $push: { usersWhoReportedThePost: req.auth.userID },
          },
          { new: true }
        )
          .then((newPost) => {
            return res
              .status(201) // created
              .json(newPost, hateoasLinks(req, newPost._id));
          })
          .catch((error) => {
            return res.status(400).json({ error: error }); // bad request
          });
      } else {
        res.status(404).json({ error: "No post to report" }); // not found
      }
    })
    .catch((error) => res.status(404).json({ error })); // not found
};

// hateoas links
const hateoasLinks = (req, id) => {
  const URI = `${req.protocol + "://" + req.get("host") + "/api/post/"}`;
  return [
    {
      rel: "readOne",
      method: "GET",
      href: URI + id,
      title: "Read post",
    },
    {
      rel: "readAll",
      method: "GET",
      href: URI,
      title: "Read all posts",
    },
    {
      rel: "create",
      method: "POST",
      href: URI,
      title: "Create a new post",
    },
    {
      rel: "update",
      method: "PUT",
      href: URI + id,
      title: "Update a post",
    },
    {
      rel: "delete",
      method: "DELETE",
      href: URI + id,
      title: "Delete a post",
    },
    {
      rel: "likeDislike",
      method: "POST",
      href: URI + id + "/like",
      title: "Add like or dislike",
    },
    {
      rel: "report",
      title: "Report",
      href: URI + id + "/report",
      method: "POST",
    },
  ];
};
