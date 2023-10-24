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

// Industry practice is to name the server as app
// express() creates a server
const app = express();

const users = [];

// using only express.static will make the folder 'public' available to the server
// because it is middle ware, hence we need to use app.use so that public is
// statically available(publically available through URL)
app.use(express.static(path.join(path.resolve(), "public")));
// Used to access form data
app.use(express.urlencoded({extended: true}));                      

// Setting up view engine for ejs
// ejs engine is used to pass dynamic values
app.set("view engine", "ejs");

// API: Get method is the basic method
app.get("/", (req, res) => {
    // Path.resolve() give us the current absolute path of the directory
    console.log(path.resolve());
    const currentLocation = path.resolve();
    
    // We join the relative path of index.html to the directory
    // and send the html file to the root '/'
    // res.sendFile(path.join(currentLocation, "./index.html"));

    res.render("index", {name: "Tejas"});
})

// API: Render success page
app.get("/success", (req, res)=>{
    res.render("success");
})

// API: Post method
app.post("/", (req,res)=>{
    users.push({username: req.body.name, email: req.body.email});
    // res.render("success");
    res.redirect("/success")
})

app.listen(5000, () => {
    console.log("Server is working");
})