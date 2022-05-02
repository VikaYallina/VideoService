module.exports = (sequelize, Sequelize) => {
    const Employee =  sequelize.define("employee", {
        firstname: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        gender:{
            type: Sequelize.STRING
        },
        hire_date:{
            type: Sequelize.DATE
        }
    });

    Employee.associate = models =>{
        Employee.belongsTo(models.User, {foreignKey: "userId"})
    }
    return Employee;
}