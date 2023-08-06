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

// delete comment from post
module.exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (comment.user == req.user.id) {
      const postId = comment.post;

      await comment.deleteOne();

      // Update the post to remove the comment from the comments array
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      return res.redirect('back');
    } else {
      return res.status(403).send("You're not authorized to delete this comment");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
