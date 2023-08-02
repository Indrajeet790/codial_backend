const Post = require("../models/post");

//post creation
module.exports.create = async (req, res) => {
  try {
    const createPost = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    console.log(createPost);
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};
