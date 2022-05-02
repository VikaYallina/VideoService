module.exports = (sequelize, Sequelize) => {
    const OwnModel = require('../utils/deep_save').OwnModel

    class CourseProgression extends OwnModel {}

    CourseProgression.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        completionRate: {
            type: Sequelize.DECIMAL(5,2)
        },
        completed:{
            type: Sequelize.ARRAY(Sequelize.BOOLEAN)
        },
        quiz: {
            type: Sequelize.JSONB
        },
        lecture:{
            type: Sequelize.JSONB
        },
        video:{
            type: Sequelize.JSONB
        }
    }, {
        modelName: 'course_progress',
        sequelize
    })

    return CourseProgression
}