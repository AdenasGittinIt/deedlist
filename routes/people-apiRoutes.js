var uuid = require('uuid/v4');
var db = require("../models");

module.exports = function (app) {
    // Take people info and send to people table in db
    app.post("/api/people", function (req, res) {
        console.log(req.body);

        // Assign a completely random new ID to the person
        req.body.id = uuid();

        db.People.create(req.body).then(function (deedlist_db) {
            res.json(deedlist_db);
        });
    });


}