module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("registration", {
        name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      streetAddress: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      subscriptionPlan: {
        type: Sequelize.STRING
      },
      emergencyContactName: {
        type: Sequelize.STRING
      },
      emergencyContactPhone: {
        type: Sequelize.STRING
      },
      emergencyContactAddress: {
        type: Sequelize.STRING
      },


      status: {
        type: Sequelize.BOOLEAN
      }
    });
    return Registration;
  };