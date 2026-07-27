   const path = require("path");
   if (process.env.NODE_ENV !== "production") {
 

require("dotenv").config({
    path: path.join(__dirname, "../.env"),
});
}




const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const initData = require("./data");

const dbUrl = process.env.ATLASDB_URL;

// Uncomment for local database
// const dbUrl = "mongodb://127.0.0.1:27017/WANDERLUST";


async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        // Fetch owner automatically
        const owner = await User.findOne({ username: "shaaz" });

        if (!owner) {
            throw new Error("Owner user not found!");
        }

        // const listings = initData.data.map((obj) => ({
        //     ...obj,
        //     owner: owner._id,
        // }));

        // await Listing.insertMany(listings);
      
        for (let obj of initData.data) {

    const listing = new Listing({
        ...obj,
        owner: owner._id,
    });

    await listing.save();
}

        console.log("Database Initialized Successfully ✅");
    } catch (err) {
        console.log(err);
    } finally {
        mongoose.connection.close();
    }
};

main()
    .then(() => {
        console.log("Connected to MongoDB");
        return initDB();
    })
    .catch((err) => {
        console.log(err);
    });