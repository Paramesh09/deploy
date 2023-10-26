const mySQL = require("mysql2");


const myConnection = mySQL.createConnection({HOST: "localhost",
USER: "root",
PASSWORD: "SmartWork@123",
DB: "node_project",
dialect: "mysql",
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}})

const result = myConnection.connect()

console.log('result',result);