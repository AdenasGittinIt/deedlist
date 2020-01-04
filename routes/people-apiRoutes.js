var db = require("../models");

module.exports = function(app) {
    // Take people info and send to people table in db
    app.post("/api/people", function(req, res) {
        db.People.create(req.body).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

   
}