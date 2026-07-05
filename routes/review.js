const express=require("express");
const router=express.Router({mergeParams:true});
const Listing = require('../models/listing.js');
// const Review = require('../models/review.js'); shifted to controllers/reviews.js
const wrapAsync=require('../utils/wrapAsync');
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");


//POST review route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(
    reviewController.deleteReview
));


module.exports=router;