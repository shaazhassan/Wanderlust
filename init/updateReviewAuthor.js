const mongoose = require("mongoose");
const Review = require("../models/review");

const MONGO_URL = "mongodb://127.0.0.1:27017/WANDERLUST";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

        await Review.updateMany(
            {},
            {
                author: "6a3ee0d104a1d3ce8e0ffcc2",
            }
        );

        console.log("All review authors updated successfully!");

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

main();