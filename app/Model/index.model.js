const db_config=require('../Configure/db.configure');
const Sequelize=require('sequelize');

const sequelize =new Sequelize(
    db_config.DB, 
    db_config.USER,
    db_config.PASSWORD,
     {
        host: db_config.HOST,
        dialect: db_config.dialect,
        operatorsAliases: false,
        pool: {
          max: db_config.pool.max,
          min: db_config.pool.min,
          acquire: db_config.pool.acquire,
          idle: db_config.pool.idle
        }
      }
);
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.table1=require('./studentTable')(sequelize,Sequelize);
console.log("model");
module.exports=db;