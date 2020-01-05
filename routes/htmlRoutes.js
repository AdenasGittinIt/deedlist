var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        db.Need.findAll({}).then(function (dbNeed) {
            res.render("index", {
                msg: "Welcome!",
                Need: dbNeed
            });
        });
    });
    // Load Need page and pass in an Need by id
    app.get("/Need/:id", function (req, res) {
        db.Need.findOne({ where: { id: req.params.id } }).then(function (dbNeed) {
            res.render("Need", {
                Need: dbNeed
            });
        });
    });

    //Load Deeds page
    app.get("/Deed/:id", function (req, res) {
        db.Deed.findOne({ where: { id: req.params.id } }).then(function (dbDeed) {
            res.render("Deed", {
                Need: dbDeed
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });

    // add route loads the add.html page, where users can enter new needs to the db.  
    // Need to find the add page in html to reference therefore the below is incorrect
    //app.get("/add", function (req, res) {
    //    res.sendFile(path.join(__dirname, "../public/add.html"));
   // });
};
