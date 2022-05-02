module.exports = (sequelize, Sequelize) => {
    const ownModel = require('../utils/deep_save').OwnModel

    class Course extends ownModel {}

    Course.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: Sequelize.STRING
        },
        desc:{
            type: Sequelize.STRING
        },
        start_date:{
            type: Sequelize.DATE
        },
        end_date:{
            type: Sequelize.DATE
        },
        steps:{
            type: Sequelize.JSONB
        }
    },{
        sequelize,
        modelName: 'course_data'
    })

    return Course
}