const Employee = require('./employee.model')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    User.associate = models =>{
        User.hasOne(models.Employee, {foreignKey: "userId"})
    }

    return User;
}

