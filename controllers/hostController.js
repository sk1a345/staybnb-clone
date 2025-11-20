// controllers/home.js
const Home = require("../models/home");
const fs = require("fs");


const getAddHome = (req, res, next) => {
  console.log("GET /host/edit-home");
  res.render("host/edit-home", {
    pageTitle: "Add New Home",
    currentPage: "add-home",
    editing: false,
    isLoggedIn : req.isLoggedIn,
    user: req.session.user,
  });
};

const getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    } else {
      console.log(homeId, editing);
      console.log("Inside the getEditHome");
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit your Home",
        currentPage: "host-homes",
        editing: editing,
        isLoggedIn : req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

const postAddHome = (req, res, next) => {
  console.log("POST /host/edit-home");
  console.log(req.body);

  const { housename, location, price,rating,description } = req.body;
  // console.log("req.file: ",req.file);

  if(!req.file){
    console.log("No file provided");
    return res.status(422).redirect("/host/add-home");
  }
  
  const photo = req.file.path;

  const home = new Home({housename, location, price,rating,photo,description});

  // Save the home, then fetch updated homes after write completes
  home.save().then(()=>{
    console.log("req.file.path: ",req.file.path);
    console.log("Home saved successfully");
  });
  res.redirect("/host/host-home-list");

};
const postDeleteHome = (req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("Inside the post-Delte-Home");
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error =>{
    console.log("Error while deleting the home: ",error);
  })
}
const postEditHome = (req, res, next) => {
  console.log("POST /host/edit-home");
  console.log(req.body);

  const { id, housename, location, price,rating,description } = req.body;

  Home.findById(id).then((home)=>{
    home.housename=housename;
    home.location = location; 
    home.price =price;
    home.rating = rating; 

    if(req.file){
      // deleting the files from the upload folder
      fs.unlink(home.photo,(err)=>{
        if(err){
          console.log("Error while deleting the file: ",err);
        }
      });
      home.photo = req.file.path;
    }
    home.description = description;
    home.save().then((result)=>{
      console.log("Home updated Successfully: ",result);
    }).catch((err)=>{console.log("Error while updating thehome",err)});
  }).catch(error=>{
    console.log("Error while finding the home: ",err);
  });
  res.redirect("/host/host-home-list");
};


const getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("host/hostHomeList", {
      registeredHomes,
      pageTitle: "Your hosted Homes",
      currentPage: "host-homes",
      isLoggedIn : req.isLoggedIn,
      user: req.session.user,
    });
  });
};
const getConsoleLog = (req, res, next) => {
  console.log("Request URL:", req.url, "| Method:", req.method);
  next();
};

module.exports = {
  getConsoleLog,
  getAddHome,
  postAddHome,
  getHostHomes,
  getEditHome,
  postEditHome,
  postDeleteHome
};
