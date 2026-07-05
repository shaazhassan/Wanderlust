const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title:{
     type: String,
     required: true
    },
    description:{
     type: String
    },
     image:{
        url: String,
        filename: String
    },
    price:{
     type: Number
    },
    location:{
     type: String
    },
    country:{
     type: String
    },
    // defining 1 to many relationship for lisitng :! to ratings :n
    geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
},
    
    reviews:[{  
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    

   
});

listingSchema.index({ geometry: "2dsphere" }); // Create a 2dsphere index on the geometry field for geospatial queries

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;