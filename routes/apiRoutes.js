var db = require("../models");

module.exports = function(app) {
    // Take people info and send to people table in db
    app.post("/api/people", function(req, res) {
        console.log(req.body);
        db.People.create(req.body).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // Take need info and send to need table in db
    app.post("/api/needs", function(req, res) {
        db.Need.create(req.body).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // Send URL and ID# to client, not sure how to do this or where it will go 

    // Get all needs for person entering needs
    // We need to use the id of the person to get all their needs, we will need to use mysql join?
    // This is not right yet
    app.get("/api/needs/:id", function(req, res) {
        db.Need.findAll({
            where: {
                id: req.params.id
            },
        }).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // Get all public needs
    app.get("/api/needs", function(req, res) {
        db.Need.findAll({
            where: {
                
            }
        }).then(function(dbExamples) {
            res.json(dbExamples);
        });
    });
}
    

    

