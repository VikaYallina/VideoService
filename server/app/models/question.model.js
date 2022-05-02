module.exports = (sequelize, Sequelize) => {

    const OwnModel = require('../utils/deep_save.js').OwnModel

    class Question extends OwnModel {
    }

    Question.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Qtext: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.INTEGER
        },
        correct: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: []
        },
        wrong: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: []
        }
    }, {
        sequelize,
        modelName: 'question'
    })

    return Question
}