const error404 = (req, res) => {
  // res.status(404).sendFile(path.join(rootDir,'views','404.html'));
  res
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      currentPage: "404",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
};

module.exports = { error404 };
