const Post=require("../../../models/post")
const Comment=require("../../../models/comment")
// find  all post 
module.exports.index=async(req,res)=>{
          // Populate the user and comments for each post
          const posts = await Post.find({})
            .sort("-createdAt")
            .populate("user")
            .populate({
              path: "comments",
              populate: {
                path: "user",
              },
            })
    return res.status(200).json({
        message:"lists of posts",
        posts:posts
    })
}
module.exports.destroy = async (req, res) => {
  try {
    const postId = req.params.id.trim(); // Sanitize the id
    const post = await Post.findById(postId);
    console.log(post);
    await post.deleteOne();
    
    // Delete comments associated with the post
    await Comment.deleteMany({ post: postId });
    
    return res.status(200).json({ message: 'post and associates are deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
