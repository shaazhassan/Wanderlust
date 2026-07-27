const {cloudinary}=require('cloudinary');
const Listing = require('../models/listing');
const maptilerClient = require("../mapConfig");



module.exports.index = async (req, res) => {

    const { category, search } = req.query;

    let filter = {};

    // Category Filter
    if (category && category !== "All") {
        filter.category = category;
    }

    // Search Filter
    if (search && search.trim() !== "") {

        filter.$or = [

            { title: { $regex: search, $options: "i" } },

            { location: { $regex: search, $options: "i" } },

            { country: { $regex: search, $options: "i" } },

            { category: { $regex: search, $options: "i" } }

        ];

    }

    const alllistings = await Listing.find(filter);

    res.render("listings/index.ejs", {

        alllistings,

        selectedCategory: category || "All",

        search: search || ""

    });

};

module.exports.renderNewForm=(req, res) => {
    res.render('listings/new.ejs');
};

module.exports.showListing= async (req, res) => {
    
        const { id } = req.params;
        const listing = await Listing.findById(id).
        populate({path:"reviews",
            populate:{path:"author",},
        })
        .populate("owner");
      //  console.log(listing);

        if(!listing){
            req.flash("error","Listing you requested for does not exist!")
            return res.redirect("/listings");
        }
        res.render('listings/show.ejs', { listing });
    
};

module.exports.createListing= async (req, res) => {
       //          if(!req.body.listing){
//        throw new ExpressError(400,"Send Valid Data");
// } as validateLisitng used

if (!req.file) {
    req.flash("error", "Please upload an image.");
    return res.redirect("/listings/new");
}
let url=req.file.path;
let filename=req.file.filename;
    
    const newListing = new Listing(req.body.listing);
        //saving new owner as owner refernce
      const geoData = await maptilerClient.geocoding.forward(
            req.body.listing.location
    );   
        newListing.owner=req.user._id; // stores the owner name automatically as some owner creates lsiting
        newListing.image={url,filename}
        newListing.geometry = geoData.features[0].geometry;

        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect('/listings');
    };

module.exports.renderEditForm= async (req, res) => {

        const { id } = req.params;
        const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
        
        res.render('listings/edit.ejs', { listing });
    } ;

    module.exports.updateListing = async (req, res) => {

    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true }
    );

    // Update location
    if (req.body.listing.location) {

        const geoData = await maptilerClient.geocoding.forward(
            req.body.listing.location
        );

        listing.geometry = geoData.features[0].geometry;
    }

    // Update image
    if (typeof req.file !== "undefined") {

        // Delete old Cloudinary image
        if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }

        // Save new image
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Edited Successfully!");
    res.redirect(`/listings/${id}`);
};
        
 module.exports.deleteListing= async (req, res) => {
   
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
         req.flash("success","Listing Deleted Successfully!");
        console.log("Deleted Successfully!\n" + deletedListing);
        res.redirect('/listings');
   
}
