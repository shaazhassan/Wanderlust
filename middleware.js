const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const ExpressError=require('./utils/ExpressError.js');
const {listingSchema,reviewSchema}=require('./schema.js');

// server side validation for adding new listing
module.exports.validateListing=(req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errorMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}

//serever side validation for adding a review using joi schema
module.exports.validateReview=(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errorMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errorMsg);
    }
    else{
        next();
    }
}


module.exports.isLoggedIn=(req,res,next)=>{
//   console.log(req.user);
//   console.log(req.isAuthenticated());
    if(!req.isAuthenticated()){
//if not loggrd in then login and same page route open, we use parameter req.user andfrom there we use path and session
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Please login before accessing this feature!");
        return res.redirect("/login");
    }
    next();
}

//implementing the same page access after login using session info
module.exports.saveRedirectUrl=(req,res,next)=>{ 
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl; //usign as lcoals to access anywhere
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{ 
    let  {id} =req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
          req.flash("error","You are not the owner of the listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor=async (req,res,next)=>{ 
    let  {id,reviewId} =req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
          req.flash("error","You are not the author of the review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};