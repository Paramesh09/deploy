module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "SmartWork@123",
    DB: "node_project",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};