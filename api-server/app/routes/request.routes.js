module.exports = app => {
    const requests = require("../controllers/request.controller.js");
    var router = require("express").Router();
    // Create a new Request
    router.post("/", requests.create);
    // Retrieve all Requests
    router.get("/", requests.findAll);
    // Retrieve all active Request
    router.get("/new", requests.findAllNew);
    // Retrieve a single Request with id
    router.get("/:id", requests.findOne);
    // Update a Request with id
    router.put("/:id", requests.update);
    // Delete a Request with id
    router.delete("/:id", requests.delete);
    // Delete all Requests
    router.delete("/", requests.deleteAll);
    app.use('/api/requests', router);
  };