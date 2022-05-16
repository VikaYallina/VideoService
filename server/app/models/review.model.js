module.exports = (sequelize, Sequelize) => {
    const OwnModel = require('../utils/deep_save').OwnModel

    class Review extends OwnModel {
    }

    Review.init(
        {
            message:{
                type: Sequelize.STRING
            },
            rating: {
                type: Sequelize.INTEGER,
                min:0,
                max:5
            }
        },
        {
            sequelize,
            modelName: "review"
        }
    )
    return Review
}