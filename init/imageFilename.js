const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/WANDERLUST";

main()
    .then(() => {
        console.log("Connected to MongoDB");
        return updateImages();
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

async function updateImages() {
    try {
        const listings = await Listing.find({});

        for (let listing of listings) {
            // Skip if already updated
            if (
                listing.image &&
                typeof listing.image === "object" &&
                listing.image.url
            ) {
                continue;
            }

            const oldImage = listing.image;

            listing.image = {
                url: oldImage,
                filename: "wanderlust_DEV/default",
            };

            await listing.save();
        }

        console.log("All listing images updated successfully!");
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
}