module.exports = (sequelize, Sequelize, Registration) => {
    const Request = sequelize.define("request", {
      registrationId: {
        type: Sequelize.STRING
      },
      service: {
        type: Sequelize.STRING
      },
      pickupPoint: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      appointmentTime: {
        type: Sequelize.DATE
      },
      pickupTime: {
        type: Sequelize.DATE
      },
      wheelChairAssisstance: {
        type: Sequelize.STRING
      },
      userComments: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.STRING
      },
      contactPerson: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      }
    });
    // One-To-one relationship
    Request.belongsTo(Registration);
    // One-To-Many relationship
    Registration.hasMany(Request);
    return Request;
  };