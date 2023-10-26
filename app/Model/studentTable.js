

module.exports = (sequelize, Sequelize) => {
    const student = sequelize.define("studentTable", {
       
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        password:{
            type:Sequelize.STRING
        },
        salt:{
            type:Sequelize.STRING
        },
        dept: {
            type: Sequelize.STRING
        },
        college: {
            type: Sequelize.STRING
        },
        batch: {
            type: Sequelize.STRING
        },
        dateofbirth:{
            type:Sequelize.DATEONLY
        },
        age:{
            type:Sequelize.STRING
        } 
       

    });
    return student;
};
