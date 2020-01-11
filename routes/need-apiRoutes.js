var db = require("../models");

module.exports = function(app) {
    // Take new need info and save in need table in db - working
    app.post("/api/needs", function(req, res) {
        console.log(req.body);
        db.Need.create(req.body).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // GET route to view public needs where claimed is false - help/don't know how to do
    // app.get("api/needs/:claimed", function(req, res) {
    //     db.Need.findAll({
    //         where: {
    //             claimed: false,
    //         },
    //     })
       

    // GET route to display needs entered by need person
    app.get("/api/needs/:PersonId", function(req, res) {
        db.Need.findAll({
            where: {
                PersonID: req.params.PersonId
            },
            include: [db.People]
        }).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });
    
    // GET route to check if email exists - working
    app.get("/api/people/:email", function(req, res) {
        db.People.findOne({
            where: {
                email: req.params.email
            },
        }).then(function(deedlist_db) {
            console.log(deedlist_db)
            res.json(deedlist_db)
        });
    });

    // GET route to view needs where status is true (not claimed yet) - working
    // don't really need this but it is working, save as example
    app.get("/api/needs/:claimed", function(req, res) {
        db.Need.findAll({
            where: {
                claimed: false
            }
        }).then(function(deedlist_db) {
            res.json(deedlist_db)
        });
    });

    // PUT route for updating claimed status from false to true
    app.put("/api/needs/:id", function(req, res) {
        db.Need.update(
            {
                where: {
                    id: req.params.id
                },
                set: {
                    claimed: true
                }
            }).then(function(deedlist_db) {
                res.json(deedlist_db)
            });
    });

    // GET route to display private needs using id# - test when need table has PersonId column
    app.get("/api/needs/:PersonId", function(req, res) {
        db.Need.findAll({
            where: {
                PersonId: req.params.PersonId
            },
            include: [db.People]
        }).then(function(deedlist_db) {
            res.json(deedlist_db)
        });
    });

    
}


