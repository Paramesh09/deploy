const express = require("express");
const app = express();
const db = require('../Node_Project_2/app/Model/index.model');
const router=require('../Node_Project_2/app/Router/index.route') 

app.use(express.json());

console.log("index");

 router.init(app)
//db.sequelize.sync({ alter: true });
db.sequelize.sync({ alter: false });

const port = process.env.PORT || 5000;

//Listen Port
app.listen(port, () => {
    console.log("Runnging : " + port);
});