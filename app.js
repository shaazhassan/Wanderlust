if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
const dns=require('node:dns'); //setting server for dns to avoid dns resolution error in some cases to connect to atlas db
dns.setServers(['1.1.1.1','8.8.8.8']);
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbUrl=process.env.ATLASDB_URL;
// const MONGO_URL = 'mongodb://127.0.0.1:27017/WANDERLUST';
// const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
// const wrapAsync=require('./utils/wrapAsync');
const ExpressError=require('./utils/ExpressError.js');
// const {listingSchema,reviewSchema}=require('./schema.js');
// const Review = require('./models/review.js'); all this moved to their respective routesfolder
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js"); 
//importing routes 
const listingRouter=require('./routes/listing.js'); 
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');


const session=require('express-session');
const MongoStore=require('connect-mongo').default;
const flash=require('connect-flash');
const user = require('./models/user.js');




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, 'public')));

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
        await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60 // time period in seconds
});
store.on("error", function (e) {
    console.log("MongoStore Session Error:", e);
});
const sessionOptions={
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};



sessionOptions.store = store;

app.use(session(sessionOptions));
app.use(flash());
//authentication 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

//test demo user eegister
// app.get('/demouser',async(req,res)=>{
//     let fakeUser= new User ({
//         email:"shaaz@gmail.com",
//         username:"shaaz"
//     });
//     let registeredUser=await User.register(fakeUser,"shaaz");
//     res.send(registeredUser);
// })

//middleware for testing if user is logged ina nd its info
// app.use((req, res, next) => {
//     console.log("User:", req.user);
//     console.log("Authenticated:", req.isAuthenticated());
//     next();
// });

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
        res.locals.error=req.flash("error");
        res.locals.currUser=req.user;
    next();
})

//lisitn route used ,listing model shifted to routes for btter modularity
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.get('/', (req, res) => {
    res.redirect('/listings');
});


// app.all('/*',(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found!"));
// }) instead since express 5 does not suport this so us ebelow part

app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render('listings/error.ejs',{message});
    // res.status(statusCode).send(message);
});
