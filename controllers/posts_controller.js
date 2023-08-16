const Post = require("../models/post");//  Post model defined
// Comment model defined
const Comment = require("../models/comment");
//post creation
module.exports.create = async (req, res) => {
  try {
    const createPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success','post publish!')
    console.log(createPost);
    return res.redirect("back");
  } catch (err) {
    req.flash('error',err)
    return res.status(500).send({error:err.message})
  }
};

// delete a post 

module.exports.destroy = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    console.log(post.user === req.user.id);
    if (post.user.toString() === req.user.id) {
       post.deleteOne();

      // Delete comments associated with the post
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success','post and associates are delete')

      return res.redirect('back');
    } else {
      req.flash('error','you can not delete this post')
      return res.status(403).send("You're not authorized to delete this post");
    }
  } catch (err) {
    req.flash('error','err')
    return res.status(500).send("Internal server error");
  }
};
