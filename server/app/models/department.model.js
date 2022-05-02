module.exports = (sequelize, Sequelize) => {
    return sequelize.define("departments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        managerId: {
            type: Sequelize.INTEGER
        }
    });
}