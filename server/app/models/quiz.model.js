module.exports = (sequelize, Sequelize) => {

    const OwnModel = require('../utils/deep_save.js').OwnModel

    class Quiz extends OwnModel {
    }

    Quiz.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        time_limit: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
        triesNo: {
            type: Sequelize.INTEGER
        },
        points_borderline:{
            type: Sequelize.INTEGER
        }
    }, {
        sequelize,
        modelName: 'quiz'
    });

    return Quiz
}