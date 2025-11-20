const {check, validationResult} = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin = (req,res,next)=>{
  res.render("auth/login",{
    pageTitle: "Login",
    currentPage: "login-page",
    editing: false,
    isLoggedIn: false,
    errors: [],
    oldInput: {email: "",password: ""},
    user: {}
  });
}

exports.postLogin= async (req,res,next)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.status(422).render("auth/login",{
    pageTitle: "login",
    currentPage: "login-page",
    isLoggedIn: false,
    editing: false,
    errors : ['User does not exist'],
    oldInput: {email},
    user:{}
  })
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(422).render("auth/login",{
      pageTitle: "Login",
      currentPage: "login-page",
      isLoggedIn: false,
      editing: false,
      errors: ['Invalid password'],
      oldInput: {email},
      user: {}
    })
  }
  req.session.user = user;
  req.session.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req,res,next)=>{
  // res.cookie("isLoggedIn",false);
  // res.clearCookie("isLoggedIn");
  req.session.destroy(()=>{
    res.redirect("/login");
  })
  
}

exports.getSignUp = (req,res,next)=>{
  
  res.render("auth/signup",{
    pageTitle: "Sign-up",
    currentPage: "Sign-up",
    editing: false,
    isLoggedIn: false,
    errors: [],
    oldInput: {firstName:"",lastName:"",email:"",role:""},
    user: {}

  })
}
exports.postSignUp = [

  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name should only contain alphabets"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name should only contain alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@!$]/)
    .withMessage("Password must contain at least one special character"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("role")
    .notEmpty()
    .withMessage("Please select the user type")
    .isIn(["user", "host"])
    .withMessage("Invalid user type"),

  check("agree")
    .notEmpty()
    .withMessage("Please accept the terms and conditions"),

  // FINAL VALIDATION HANDLER
  (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        editing: false,
        errors: errors.array().map(err => err.msg),
        oldInput: { firstName, lastName, email, role },
        user: {}
      });
    }
    bcrypt.hash(password,12)
    .then(hashedPass =>{
      const user = new User({firstName,lastName,email,password: hashedPass,role})
    user.save().then(()=>{
      res.redirect("/login")
    }).catch(err =>{
      console.log("Error while saving user: ",err);
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        editing: false,
        errors: [err.message],
        oldInput: { firstName, lastName, email, role },
        user:{}
      });
    });
    })
    
  }
];


exports.getTerms = (req,res,next)=>{
  res.render("auth/terms",{
    pageTitle:"Sign-up",
    currentPage:"Sign-up",
    editing: false,
    isLoggedIn: false,
    user: {}
  })
}