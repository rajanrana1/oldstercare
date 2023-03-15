module.exports = app => {
    const registrations = require("../controllers/registration.controller.js");
    var router = require("express").Router();
    // Create a new Registration
    router.post("/", registrations.create);
    // Retrieve all Registrations
    router.get("/", registrations.findAll);
    // Retrieve all active Registration
    router.get("/published", registrations.findAllPublished);
    // Retrieve a single Registration with id
    router.get("/:id", registrations.findOne);
    // Update a Registration with id
    router.put("/:id", registrations.update);
    // Delete a Registration with id
    router.delete("/:id", registrations.delete);
    // Delete all Registrations
    router.delete("/", registrations.deleteAll);
    app.use('/api/registrations', router);
  };