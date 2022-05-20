module.exports = (sequelize, Sequelize) => {
    const OwnModel = require('../utils/deep_save').OwnModel

    class CourseProgression extends OwnModel {}

    CourseProgression.init({
        c_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
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