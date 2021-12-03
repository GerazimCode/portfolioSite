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

app.listen(port, () => {
    console.log("The app is running on port 3000");
})