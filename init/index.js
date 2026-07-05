const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/WANDERLUST";

const Listing = require("../models/listing");
const initData = require("./data");

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        // Add owner to every sample listing
        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "6a3ee0d104a1d3ce8e0ffcc2",
        }));

        await Listing.insertMany(initData.data);

        console.log("Database initialized with sample data");
    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        mongoose.connection.close();
    }
};

initDB();