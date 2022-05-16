const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOpt = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOpt));

// parse requests of content-type - application/json
app.use(express.json());

app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

app.on('uncaughtException', function (err) {
    console.log(err);
});

const db = require('./app/models');
const Role = db.role;
const Department = db.department
db.sequelize.sync();
//
// To drop tables from db
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
//   });

function initial(){
    Role.create({
        id: 1,
        name: "employee"
    });

    Role.create({
        id: 2, 
        name: "admin"
    });

    Role.create({
        id: 3, 
        name: 'boss'
    })

    Department.create({
        name: 'Маркетинг'
    })

    Department.create({
        name: 'IT'
    })

    Department.create({
        name: 'Бухгалтерия'
    })
}

app.get("/", (req, res) => {
    res.json({message: "Welcome"});
})

require('./app/routes/employee.route.js')(app)
require('./app/routes/auth.route.js')(app)
require('./app/routes/user.route.js')(app)
require('./app/routes/quiz.route.js')(app)
require('./app/routes/question.route.js')(app)
require('./app/routes/lecture.route.js')(app)
require('./app/routes/video.route.js')(app)
require('./app/routes/course.route')(app)
require('./app/routes/quiz_result.route')(app)
require('./app/routes/course_progress.route')(app)
require('./app/routes/department.route')(app)
require('./app/routes/review.route')(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})