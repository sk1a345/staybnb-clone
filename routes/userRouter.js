// Core Modules:
// const path = require('path');

// External Modules
const express = require('express');
const userRouter = express.Router();

// Local Module:
// const rootDir = require('../utils/pathUtil');
const storeController = require('../controllers/storeController');

userRouter.use("/",storeController.getConsoleLog)

userRouter.get("/",storeController.getIndex);

userRouter.get("/homes",storeController.getHomes);

userRouter.get("/favourites",storeController.getFavourite);

userRouter.get("/bookings",storeController.getBookings);

userRouter.get("/homes/:homeId",storeController.getHomeDetails);

userRouter.post("/favourites",storeController.postAddToFav);

userRouter.post("/favourites/:homeId",storeController.postDeleteFav);

module.exports = userRouter;