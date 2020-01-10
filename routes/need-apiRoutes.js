var db = require("../models");

module.exports = function(app) {
    // Take new need info and save in need table in db
    console.log("needs route imported")
    app.post("/api/needs", function(req, res) {
        db.Need.create(req.body).then(function(deedlist_db) {
            res.json(deedlist_db);
        });
    });

    // GET route to view public needs where status is true
    // app.get("api/needs/:status", function(req, res) {
    //     db.Need.findAll({
    //         where: {
    //             status: req.params.status
    //         },
    //         include: [{
    //             model: models.People,
    //             private: 0
    //         }]
    //     }).then(function(deedlist_db) {
    //         res.json(deedlist_db);
    //     });
    // });

    // GET route to display needs entered by need person
    // would this be the same as GET route for person by id#?
    
    // GET route to check if email exists
    // app.get("/api/people/:email", function(req, res) {
    //     db.People.findAll({
    //         where: {
    //             email: req.params.email
    //         },
    //     }).then(function(deedlist_db) {
    //         res.json(deedlist_db)
    //     }).then(function(result) {
    //         if (!result.length) {
    //             res.status(404).end();
    //         }
    //     });
    // });

    // GET route to view needs where status is true (not claimed yet)
    // don't really need this but it is working, save as example

    app.get("/api/needs/:status", function(req, res) {
        db.Need.findAll({
            where: {
                status: false
            }
        }).then(function(deedlist_db) {
            res.json(deedlist_db)
        });
    });

    // PUT route for updating status of need after it is claimed
    //Destroy!!!!

    // app.delete("/api/needs/:status", function(req, res) {
    //     db.Need.destroy(
    //         {
    //             where: {
    //                 status: req.body.status
    //             }
    //         }).then(function(deedlist_db) {
    //             res.json(deedlist_db)
    //         });
    // });

    // GET route to display private needs using id#

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


    // app.post("/api/needs/test", function(req, res) {
    //     db.People.findOne({
    //         where: {
    //             email: email
    //         }
    //     }).then(function(user) {
    //         db.Need.create({
    //             PersonId: user.Id
    //         }).then(function(deedlist_db) {
    //             res.json(deedlist_db);
    //         });
    //     })
        
    // }); 


    // Send URL and ID# to client, not sure how to do this or where it will go 

    // Get all needs for person entering needs
    // app.get("/api/needs/:id", function(req, res) {
    //     db.Need.findAll({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.People]
    //     }).then(function(deedlist_db) {
    //         res.json(deedlist_db);
    //     });
    // });

    // Get needs using ID

    // Delete route for needs that are claimed
    // app.delete("/api/needs/:id", function(req, res) {
    //     db.Need.destroy({ 
    //         where: { 
    //             id: req.params.id 
    //         }
    //     }).then(function(deedlist_db) {
    //         res.json(deedlist_db);
    //     });
    // });
}
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
