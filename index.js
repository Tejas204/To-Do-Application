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

// Get method is the basic method
app.get("/", (req, res) => {
    // Path.resolve() give us the current absolute path of the directory
    console.log(path.resolve());
    const currentLocation = path.resolve();
    
    // We join the relative path of index.html to the directory
    // and send the html file to the root '/'
    res.sendFile(path.join(currentLocation, "./index.html"));
})

app.listen(5000, () => {
    console.log("Server is working");
})