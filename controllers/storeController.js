// controllers/home.js
const Home = require("../models/home");
const User = require("../models/user");

const getHomes = (req, res, next) => {
  // fetch all homes for home.ejs:
  Home.find().then((registeredHomes) => {
    res.render("store/home", {
      registeredHomes,
      pageTitle: "All Homes",
      currentPage: "more-homes",
      isLoggedIn : req.isLoggedIn,
      user: req.session.user,
    });
  });
};

const getIndex = (req, res) => {
  console.log("Inside the index");

  // If host -> redirect them to host panel
  if (req.isLoggedIn && req.session.user.role === "host") {
    return res.redirect("/host/host-home-list");
  }

  // Else → show user homepage
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes,
      pageTitle: "Welcome User",
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};


const getBookings = (req, res, next) => {
  console.log("Inside the bookings");
  res.render("store/bookings", {
    pageTitle: "Your Bookings",
    currentPage: "bookings",
    isLoggedIn : req.isLoggedIn,
    user: req.session.user,
  });
};

const getFavourite = async(req, res, next) => {
  console.log("Inside the getFavourite")
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
  res.render("store/favouriteList",{
    favouriteHomes: user.favourites,
    pageTitle: 'favourite',
    currentPage: 'favourites',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

const getConsoleLog = (req, res, next) => {
  console.log("Request URL:", req.url, "| Method:", req.method);
  next();
};

const getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/");
    } else {
      console.log("Home Details found: ", home);
      console.log("At homeDetails page ", homeId);
      res.render("store/homeDetails", {
        pageTitle: home.housename || "Home Details",
        currentPage: "more-homes",
        home: home,
        isLoggedIn : req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
const postDeleteFav = async (req, res, next) => {
  console.log("Inside the delete Favourites");
  
  const homeId = req.params.homeId;
  const userId = req.session.user._id;

  try {
    const user = await User.findById(userId);

    // Remove homeId from favourites
    user.favourites = user.favourites.filter(
      favId => favId.toString() !== homeId.toString()
    );

    await user.save();

    console.log("Favourite removed successfully");
    res.redirect("/favourites");
  } catch (err) {
    console.log("Error while deleting favourite:", err);
    res.redirect("/favourites");
  }
};

const postAddToFav = async(req, res, next) => {

  console.log("Inside the favourite: ", req.body);
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)){
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

module.exports = {
  getConsoleLog,
  getHomes,
  getBookings,
  getFavourite,
  getIndex,
  getHomeDetails,
  postAddToFav,
  postDeleteFav,
};
