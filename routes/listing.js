
const express=require("express");
const router=express.Router();
// const Listing = require('../models/listing.js'); shifted to controllers/listings.js
const wrapAsync=require('../utils/wrapAsync');
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

// example below for previous app.js page tosave in the beginning
// const newListing = new Listing({
//     title: 'Beautiful Beach House',
//     description: 'A lovely beach house with stunning ocean views.',
//     image: '',
//     price: 2000,
//     location: 'Miami, FL',
//     country: 'USA'
// });

// newListing.save().then(() => {
//     console.log('New listing saved successfully');
// }).catch(err => {
//     console.error('Error saving listing:', err);
// });





//iNDEX ROUTE and create route rerouted formatted
router.
route('/')
.get(wrapAsync (listingController.index))
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)
);

//NEW ROUTE
router.get('/new', isLoggedIn,listingController.renderNewForm);

router.route('/:id')
.get(wrapAsync (listingController.showListing))
.put(isLoggedIn, isOwner,upload.single('listing[image]'), 
validateListing, wrapAsync (listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync (listingController.deleteListing));

//SHOW ROUTE
// router.get('/:id',  wrapAsync (listingController.showListing));




//edit route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync (listingController.renderEditForm));

// //update route
// router.put('/:id',isLoggedIn, isOwner,validateListing, wrapAsync (listingController.updateListing));

// //delete route
// router.delete('/:id', isLoggedIn, isOwner,wrapAsync (listingController.deleteListing));

module.exports=router;