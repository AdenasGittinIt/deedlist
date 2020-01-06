var db = require("../models");

module.exports = function (app) {

    // // GET route for getting all of the people
    app.get("/api/people", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.People.findAll({}).then(function (deedlist_db) {
            // We have access to the people as an argument inside of the callback function
            res.json(deedlist_db);
        });
    });
    // POST Route to take people info and send to people table in db
    app.post("/api/people", function (req, res) {
        console.log(req.body);

        // Assign a completely random new ID to the person
        req.body.id = uuid();
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.People.create(req.body).then(function (deedlist_db) {
            res.json(deedlist_db);
        });
    });
    // DELETE route for deleting a person. We can get the id of the person we want to delete from
    // req.params.id
    app.delete("/api/people/:id", function (req, res) {
        db.People.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // PUT route for updating people. We can get the updated people from req.body
    app.put("/api/people", function (req, res) {
        db.People.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (deedlist_db) {
            res.json(deedlist_db);
        });
    });
}