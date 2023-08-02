const Comment = require("../models/comment");
const Post = require("../models/post");

// create comment  of a post

module.exports.create = async function (req, res) {
  try {
    // find post id and  create comment
    const post = await Post.findById(req.body.post);

    // if post is found then user can create a comment on post
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      res.redirect("/");
    } else {
      console.log("Post not found");
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
};
