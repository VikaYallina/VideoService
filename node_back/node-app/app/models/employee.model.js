module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        firstname:{
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        birthdate:{
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING
        }
    });

    return Employee;
}