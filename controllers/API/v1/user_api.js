const jwt = require("jsonwebtoken"); // Import the 'jsonwebtoken' library
const User = require("../../../models/user");


// Create a session by verifying user credentials and generating a JWT token
module.exports.createSession = async (req, res) => {
  try {
    // Find a user in the database based on the provided email
    const user = await User.findOne({ email: req.body.email }); // Add 'await' here

    // Check if a user with the given email exists and if the provided password matches
    if (!user || user.password !== req.body.password) {
      return res.status(422).json({ message: "Invalid userName/password" });
    }

        // Generate a new JWT token with the user's data as the payload, a secret key "codeial",
    // and set the token's expiration time to 1 day (24 hours)
    const token = jwt.sign(user.toJSON(), "codeial", { expiresIn: "1d" });

    return res.status(200).json({
      message: "Sign in successful. Here is your token. Please keep it safe!",
      data: {
        token: token,
      },
    });
  } catch (err) {
    console.log("*************", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
