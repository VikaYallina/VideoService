module.exports = (sequelize, Sequelize) => {
    const OwnModel = require('../utils/deep_save').OwnModel

    class QuizResult extends OwnModel{}

    QuizResult.init({
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        correct: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.INTEGER
        },
        tryNo : {
            type: Sequelize.INTEGER
        },
        time_taken : {
            type: Sequelize.BIGINT
        },
        result:{
            type: Sequelize.JSONB
        }
    },{
        modelName: 'quiz_result',
        sequelize
    })

    return QuizResult
}