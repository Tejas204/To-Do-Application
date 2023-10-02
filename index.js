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

// Industry practice is to name the server as app
const app = express();

app.listen(5000, () => {
    console.log("Server is working");
})