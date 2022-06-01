module.exports = {
    development:{
        host: "localhost",
        username: "postgres",
        password: "jessica17",
        database: "123db",
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 300000,
            idle: 10000
        }
    },
    test:{
        host: "localhost",
        username: "postgres",
        password: "jessica17",
        database: "test-vkr-db",
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 300000,
            idle: 10000
        }
    }
}