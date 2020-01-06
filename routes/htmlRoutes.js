var db = require("../models");
module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Need.findAll({}).then(function(dbNeed) {
            res.render("index", {
                msg: "Welcome!",
                Need: dbNeed
            });
        });
    });

    app.get("/home", function(req, res) {
        db.Need.findAll({}).then(function(dbNeed) {
            res.render("home", {
                msg: "Home",
                examples: dbNeed
            });
        });
    });

    app.get("/#tos", function(req, res) {
        db.Need.findAll({}).then(function(dbNeed) {
            res.render("#tos", {
                msg: "Terms",
                examples: dbNeed
            });
        });
    });

    // Load Need page and pass in an Need by id
    app.get("/Need/:id", function(req, res) {
        db.Need.findOne({ where: { id: req.params.id } }).then(function(dbNeed) {
            res.render("Need", {
                Need: dbNeed
            });
        });
    });
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};