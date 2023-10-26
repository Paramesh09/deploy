const db_config=require('../Configure/db.configure');
const Sequelize=require('sequelize');

const sequelize = new Sequelize(db_config.DB, db_config.USER, db_config.PASSWORD, {
  host: db_config.HOST,
  dialect: db_config.dialect,
  port: db_config.port,
});
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.table1=require('./studentTable')(sequelize,Sequelize);
console.log("model");
module.exports=db;