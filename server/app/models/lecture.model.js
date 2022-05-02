module.exports = (sequelize, Sequelize) => {
    const OwnModel = require('../utils/deep_save.js').OwnModel

    class Lecture extends OwnModel {}
    Lecture.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
        l_data: {
            type: Sequelize.JSON
        }
    }, {
        sequelize,
        modelName: "lecture"
    })
    return Lecture
}