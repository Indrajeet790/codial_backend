module.exports.profile = function (req, res) {
  return res.render("User_profile", {
    title: "User",
  });
};
