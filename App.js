// core modules:
const path = require("path");

// External Modules
const express = require("express");
const multer = require("multer");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

// DB path
const DB_Path = process.env.DB_URL;


// MongoDB session store
const store = new MongoDBStore({
  uri: DB_Path,
  collection: "sessions",
});

const randomString = (length) =>{
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = '';
  for (let i =0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename: (req,file,cb)=>{
    cb(null,randomString(10)+'0'+file.originalname);
  }
})
const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype=== 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null,true);
  }else{
    cb(null,false);
  }
}
const multerOptions = {
  storage,fileFilter
}
// Body parser
app.use(express.urlencoded({ extended: true }));

app.use(multer(multerOptions).single('photo'));


// Session middleware (MUST be before routes)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Static files
const rootDir = require("./utils/pathUtil");
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads",express.static(path.join(rootDir,'uploads')));
app.use("/host/uploads",express.static(path.join(rootDir,'uploads')));
app.use("/homes/uploads",express.static(path.join(rootDir,'uploads')));

// Local routers
const userRouter = require("./routes/userRouter");
const errorController = require("./controllers/error");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");

// Pass login state to all routes
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Public routes
app.use(userRouter);
app.use(authRouter);

// Protect host routes
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) return next();
  res.redirect("/login");
});
app.use("/host", hostRouter);

// 404
app.use(errorController.error404);

// Server + DB
const port =process.env.PORT || 3000;
mongoose
  .connect(DB_Path)
  .then(() => {
    console.log("🐰 Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err);
  });
