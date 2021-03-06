module.exports = {
    development:{
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
    },
    test:{
        HOST: "localhost",
        USER: "postgres",
        PASSWORD: "jessica17",
        DB: "test-vkr-db",
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 300000,
            idle: 10000
        }
    }
}