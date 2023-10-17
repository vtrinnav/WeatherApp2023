// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require ("express");

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require ("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//post route
app.post("/add", async(req,res)=>{
    const body = await req.body;
    projectData = body;
    console.log(projectData);
    res.send(projectData);
});

//get route
app.get("/all", async (req,res) =>{
    if(projectData){ //delete?
        console.log(projectData);
        res.send(projectData);
    }
});

// Setup Server
//set variables
const port = 8000;

//var server listen
const server = app.listen (port, listening);

function listening () {
    console.log("Server Running");
    console.log(`running on localhost: ${port}`);
};

