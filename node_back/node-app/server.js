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

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

const db = require('./app/models');
db.sequelize.sync();

// To drop tables from db
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.get("/", (req, res) => {
    res.json({message: "Welcome"});
})

require('./app/routes/employee.route.js')(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})