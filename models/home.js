const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({

  housename :{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
  },
  description: {
    type: String
  }
})

// homeSchema.pre('findOneAndDelete',async function(next){
//   console.log("Came to pre hook while deleting a home");
//   const homeId = this.getQuery()._id;
//   await favourite.deleteMany({homeId: homeId});
//   next();
// })
module.exports = mongoose.model('Home',homeSchema);