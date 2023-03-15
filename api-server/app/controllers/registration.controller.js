const db = require("../models");
const Registration = db.registrations;
const Request = db.requests;
const Op = db.Sequelize.Op;

// Create and Save a new Regestration
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a registration
    const registration = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        subscriptionPlan: req.body.subscriptionPlan,
        emergencyContactName: req.body.emergencyContactName,
        emergencyContactPhone: req.body.emergencyContactPhone,
        emergencyContactAddress: req.body.emergencyContactAddress,
        status: req.body.status ? req.body.status : false,
    };
    // Save Tutorial in the database
    Registration.create(registration)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the REgistration."
        });
      });
  };

  // Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    Registration.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Registrations."
        });
      });
  };

  // Find a single Registration with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Registration.findByPk(id,{
      include: [{
        model: Request
      }]}
      )
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Registration with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Registration with id=" + id
        });
      });
  };

  // Update a Registration by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Registration.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Registration was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Registration with id=${id}. Maybe Registration was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Registration with id=" + id
        });
      });
  };

  // Delete a Registration with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Registration.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Registration was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Registration with id=${id}. Maybe Registration was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Registration with id=" + id
        });
      });
  };

  // Delete all Registrations from the database.
exports.deleteAll = (req, res) => {
    Registration.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Registrations were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Registrations."
        });
      });
  };

  // Find all active Registrations
exports.findAllPublished = (req, res) => {
    Registration.findAll({ where: { status: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Registrations."
        });
      });
  };