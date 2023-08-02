const Post = require("../models/post");

module.exports.home = async function (req, res) {
  try {
    // populate the user each post
    const posts = await Post.find({}).populate("user").exec();
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
