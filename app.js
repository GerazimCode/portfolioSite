// Variables to require neccessary dependencies

let express = require("express");
let app = express();
let port = 3000;
let absolutePath = "/static";
let { projects } = require("./data.json");

// app middleware
app.set("view engine", "pug");
app.use(absolutePath, express.static("public"));

/**
 * App Routes
 */

// home route
app.get("/", (req, res) => {
    res.render("index", { projects });
})

// about route
app.get("/about", (req, res) => {
    res.render("about");
})

// project route
app.get("/projects/:id", (req, res) => {
    let { id } = req.params;
    let projectName = projects[id].project_name;
    let { description } = projects[id];
    let { technologies } = projects[id];
    let images = projects[id].image_urls.slice(1);
    let githubLink = projects[id].github_link;
    let liveLink = projects[id].live_link;

    res.render("project", { projectName, description, technologies, images, githubLink, liveLink });

})

/**
 * Project error handling
 */

// 404 Error handling to catch non existent and undefined routes
app.use((req, res, next) => {
    let customError = new Error("This page does not exist!!");
    customError.status = 404;
    console.log(customError.message);
    console.log(`Error Code: ${customError.status}`);
    next();
})

// Global Error handling to server errors...
app.use((err, req, res, next) => {
    err.status = 500;
    res.status(500);
    err.message = "This page does not exist";
    let errorMessage = err.message;
    console.log(errorMessage);
    console.log(`Error Code: ${err.status}`);
    next();

})

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`);
})