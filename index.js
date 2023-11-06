/*********** Node basic starts ***********************
 
import http from "http"
// import gfName, { gfName2, gfName3 } from "./feature.js";
import {generateNumber} from "./feature.js"



// Create server
const server = http.createServer((req, res) => {
    

    // req.url will return the current route/endpoint.
    // The endpoint will help trigger the API's in some cases
    // When we go to about, the API generateNumber() is triggered
    // if(req.url == '/about'){
    //     // Res.end will prevent the unlimited rendering of the browser
    //     res.end(`<h1>In about: ${generateNumber()}</h1>`);
    // }
    // else if(req.url == '/'){
    //     res.end("<h1>Home</h1>");
    // }
    // else if(req.url == '/contact'){
    //     res.end("<h1>In contact</h1>");
    // }
    // else{
    //     res.end("Page not found!!");
    // }
});

server.listen(5000, () => {
    console.log("Server is working")
})
*************** Node basic ends ********************/

import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken";

// Industry practice is to name the server as app
// express() creates a server
const app = express();

// Connection: node to mongoDB
mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend",
}).then(c=>console.log("Database Connected")).catch((e)=>console.log(e));

// Schema: defines what the document will contain
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Define model/collection
const User = mongoose.model("User", userSchema);

const users = [];

// using only express.static will make the folder 'public' available to the server
// because it is middle ware, hence we need to use app.use so that public is
// statically available(publically available through URL)
app.use(express.static(path.join(path.resolve(), "public")));

// Used to access form data
app.use(express.urlencoded({extended: true}));   

// Cookie Parser: used to access all cookies
app.use(cookieParser());    

// Setting up view engine for ejs
// ejs engine is used to pass dynamic values
app.set("view engine", "ejs");

// Function: Authentication middleware
const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    if(token){
        // The token encrypted using client secret is decoded here.
        const decoded = jwt.verify(token, "asasasasas");

        // Store the user data in a variable from the database
        req.user = await User.findById(decoded._id);

        next();
    }
    else{
        res.render("login");
    }
}

// API: Get method is the basic method
app.get("/", isAuthenticated,(req, res) => {
    // Path.resolve() give us the current absolute path of the directory
    console.log(path.resolve());
    const currentLocation = path.resolve();
    
    // We join the relative path of index.html to the directory
    // and send the html file to the root '/'
    // res.sendFile(path.join(currentLocation, "./index.html"));
    
    res.render("logout", {name: req.user.name});

})

// Route: for logout page
// "Get" is used for logout as we don't need to pass any data
app.get("/logout", (req, res)=>{
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/")
});

// Route: for registration page
app.get("/register", (req, res)=>{
    res.render("register");
});

// Route: for login page
app.get("/login", (req, res) => {
    res.render("login");
})


// API: Login API
app.post("/login", async (req, res)=>{
    // Cookie: It stores data of the loggin in user
    // Ex: Key-Value pairs, domain, path, expiry of cookies.
    // When cookie expires, user is automatically logged out. Default expiry is 'session'

    const {name, email, password} = req.body;

    // Find if the user exists by email
    let user = await User.findOne({email});
    if(!user){
       res.redirect("/register");
    }
})




// API: Register API
app.post("/register", async (req, res)=>{
    // res.render("register");

    const {name, email, password} = req.body;

    // Find if the user exists by email
    let user = await User.findOne({email});

    // If user exists, don't register, redirect to login
    if(user){
        return res.redirect("/login");
    }
    // Register new user
    user = await User.create({
        name: name,
        email: email,
        password: password
    });

    // Create encrypted token with client secret
    const token = jwt.sign({_id: user._id}, "asasasasas");

    // Create a cookie to store user data
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60*1000),
    });
    
    res.redirect("/");
})

app.listen(5000, () => {
    console.log("Server is working");
})