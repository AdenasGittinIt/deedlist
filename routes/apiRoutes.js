var deedlist_db = require("../models");

module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
        deedlist_db.Example.findAll({}).then(function(deedlist_dbExamples) {
            res.json(deedlist_dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        deedlist_db.Example.create(req.body).then(function(deedlist_dbExample) {
            res.json(deedlist_dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        deedlist_db.Example.destroy({ where: { id: req.params.id } }).then(function(deedlist_dbExample) {
            res.json(deedlist_dbExample);
        });
    });
};
