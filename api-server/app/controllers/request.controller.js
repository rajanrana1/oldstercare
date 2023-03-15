const db = require("../models");
const Request = db.requests;
const Registration = db.registrations;
const Op = db.Sequelize.Op;

// Create and Save a new Request
exports.create = (req, res) => {
    // Validate request
    if (!req.body.registrationId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a request
    const request = {
      
      registrationId: req.body.registrationId,
      service: req.body.service,
      pickupPoint: req.body.pickupPoint,
      destination: req.body.destination,
      appointmentTime: req.body.appointmentTime,
      pickupTime: req.body.pickupTime,
      wheelChairAssisstance: req.body.wheelChairAssisstance,
      userComments: req.body.userComments,
      status: req.body.status,
      comments: req.body.comments,
      vendor: req.body.vendor,
      contactPerson: req.body.contactPerson,
      contactNumber: req.body.contactNumber,

        
    };
    // Save Tutorial in the database
    Request.create(request)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Request."
        });
      });
  };

  // Retrieve all requests from the database.
exports.findAll = (req, res) => {
    const registrationId = req.query.registrationId;

    var condition = null;
    if(registrationId == "Completed" || registrationId == "Booked" || registrationId == "New"){
      condition = { status: { [Op.eq]: `${registrationId}`} };
    }else{
      condition = registrationId ? { [Op.or] : [{registrationId: { [Op.like]: `%${registrationId}%` }}, {'$Registration.name$': { [Op.like]: `%${registrationId}%` }}] } : null;
    }
    
    Request.findAll({ where: 
       condition
      ,
      include: [{
        model: Registration
      }]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving requests."
        });
      });
  };

  // Find a single Requests with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Request.findByPk(id,{
      include: [{
        model: Registration
      }]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find request with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving request with id=" + id
        });
      });
  };

  // Update a request by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Request.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Request with id=${id}. Maybe Request was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Request with id=" + id
        });
      });
  };

  // Delete a Request with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Request.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Request with id=${id}. Maybe Request was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete request with id=" + id
        });
      });
  };

  // Delete all Requests from the database.
exports.deleteAll = (req, res) => {
    Request.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Request were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Requests."
        });
      });
  };

  // Find all active Requests
exports.findAllNew = (req, res) => {
    Request.findAll({ where: { status: 'New' } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Requests."
        });
      });
  };