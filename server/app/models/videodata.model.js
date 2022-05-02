module.exports = (sequelize, Sequelize) => {
    const ownModel = require('../utils/deep_save').OwnModel

    class VideoData extends ownModel{}

    VideoData.init({
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        title:{
            type: Sequelize.STRING
        },
        desc:{
            type: Sequelize.STRING
        },
        filename:{
            type: Sequelize.STRING
        }
    },{
        sequelize,
        modelName: 'video_data'
    })

    return VideoData
}