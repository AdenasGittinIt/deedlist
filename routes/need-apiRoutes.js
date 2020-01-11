var db = require("../models");

module.exports = function(app) {
    // Take new need info and save in need table in db - working
    app.post("/api/needs", function(req, res) {
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
<<<<<<< HEAD
//     app.post("/api/needs/test", function(req, res) {
//         db.People.findOne({
//             where: {
//                 email: email
//             }
//         }).then(function(user) {
//             db.Need.create({
//                 PersonId: user.Id
//             }).then(function(deedlist_db) {
//                 res.json(deedlist_db);
//             });
//         })
        
//     });


//     // Send URL and ID# to client, not sure how to do this or where it will go 

//     // Get all needs for person entering needs
//     // app.get("/api/needs/:id", function(req, res) {
//     //     db.Need.findAll({
//     //         where: {
//     //             id: req.params.id
//     //         },
//     //         include: [db.People]
//     //     }).then(function(deedlist_db) {
//     //         res.json(deedlist_db);
//     //     });
//     // });

//     // Get all public needs
//     // app.get("/api/needs", function(req, res) {
//     //     db.Need.findAll({
//     //         where: {
                
//     //         }
//     //     }).then(function(dbExamples) {
//     //         res.json(dbExamples);
//     //     });
//     // });

//     // Get needs using ID

//     // Delete route for needs that are claimed
//     // app.delete("/api/needs/:id", function(req, res) {
//     //     db.Need.destroy({ 
//     //         where: { 
//     //             id: req.params.id 
//     //         }
//     //     }).then(function(deedlist_db) {
//     //         res.json(deedlist_db);
//     //     });
//     // });
// }
// // These were the api routes that were givin to us in starter code


// // Get all examples
// //     app.get("/api/examples", function(req, res) {
// //         db.Example.findAll({}).then(function(dbExamples) {
// //             res.json(dbExamples);
// //         });
// //     });

// //     // Create a new example
// //     app.post("/api/examples", function(req, res) {
// //         db.Example.create(req.body).then(function(dbExample) {
// //             res.json(dbExample);
// //         });
// //     });

// //     // Delete an example by id
// //     app.delete("/api/examples/:id", function(req, res) {
// //         db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
// //             res.json(dbExample);
// //         });
// //     });
// // };
=======


>>>>>>> d98e7150eb09a38a53aaf12f61e4954b965a0bd0
