module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "jessica17",
    DB: "vkr-db",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 300000,
        idle: 10000
    }
}