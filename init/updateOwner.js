const mongoose = require("mongoose");
const Listing = require("../models/listing");

main()
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WANDERLUST");
}

async function updateOwner() {
    await Listing.updateMany(
        {},
        {
            owner: "6a3ee0d104a1d3ce8e0ffcc2",
        }
    );

    console.log("All listings updated successfully!");
    mongoose.connection.close();
}

updateOwner();