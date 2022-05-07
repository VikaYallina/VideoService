const dbConfig = require("../config/db.config");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require('./employee.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.quiz = require('./quiz.model.js')(sequelize, Sequelize)
db.question = require('./question.model.js')(sequelize, Sequelize)
db.lecture = require('./lecture.model.js')(sequelize, Sequelize)
db.video_data = require('./videodata.model')(sequelize, Sequelize)
db.course_data = require('./course.model')(sequelize, Sequelize)
db.course_progress = require('./course_progress.model')(sequelize, Sequelize)
db.quiz_result = require('./quiz_result.model')(sequelize, Sequelize)
db.department = require('./department.model')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
})

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

db.department.hasMany(db.employee, {
    foreignKey:"depId"
})

db.employee.department = db.employee.belongsTo(db.department,{
    foreignKey: "depId"
})

db.quiz.question = db.quiz.hasMany(
    db.question,
    {
        as: "questions",
        onDelete: "CASCADE"
    })

db.question.belongsTo(db.quiz, {
    foreignKey: "quizId",
    as: "question_quiz"
})

// ===============
// db.course_data.hasMany(db.course_progress, {
//     foreignKey: 'courseId'
// })
// ===============

// db.course_progress.belongsTo(db.quiz)
// db.course_progress.belongsTo(
//     db.quiz, {
//         foreignKey: "quizId",
//         as: "quiz"
// })

// ==============
// db.user.hasMany(db.course_progress, {
//     foreignKey: "userId"
// })
// db.course_progress.belongsTo(db.user)
// ==============

db.employee.belongsToMany(db.course_data, {
    through:db.course_progress,
    foreignKey: "employeeId"
})

db.course_data.belongsToMany(db.employee, {
    through:db.course_progress
})
db.employee.hasMany(db.course_progress)
db.course_progress.belongsTo(db.employee)

db.course_data.hasMany(db.course_progress)
db.course_progress.belongsTo(db.course_data, {foreignKey:"courseId", as:"courseData"})





db.quiz.hasMany(db.quiz_result,{
    foreignKey: "quizId"
})

db.user.hasMany(db.quiz_result, {
    foreignKey: "userId"
})

db.ROLES = ['employee', 'admin', 'boss']

module.exports = db;