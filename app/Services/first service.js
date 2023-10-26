const db = require('../Model/index.model');
const studentTable = db.table1;
const sequelize = require('sequelize')
const { Op } = require('sequelize')
//const bcrypt = require('bcryptjs')
const hashPassword = require('../Lib/hashPassword')
//require('dotenv').config();

//createlogic
async function Create(data) {
    //console.log("data", data);


    try {
        const acessColumn = new studentTable;

        const encryptPassword = hashPassword.encryptPassword(data.password);
        acessColumn.name = data.name;
        acessColumn.dept = data.dept;
        acessColumn.batch = data.batch;
        acessColumn.college = data.college;
        acessColumn.age = data.age;
        acessColumn.dateofbirth = data.dateofbirth;
        acessColumn.salt = encryptPassword.salt;
        acessColumn.password = encryptPassword.hash;

        console.log('salt', encryptPassword);
        if (acessColumn) {
            try {


                var createData = await acessColumn.save();
                return { isSuccess: true, message: "Table Created Successfully!!", data: createData };
            } catch (err) {
                return { isSuccess: false, message: "Failed to Created Table!!", data: err };
            }
        }
        // if (studentTable == null) {
        //     return { isSuccess: false, user: {}, message: "No records created!" };
        // }
    }
    catch (err) {
        // console.log(err)
        return { isSuccess: false, message: "Failed to the Access Table!!", data: err };
    }
};


//getbyid
async function getOnee(data) {
    try {

        const student = await studentTable.findOne({ where: { name: data.name } });
        const requiredPassword = student.password;
        const requiredSalt = student.salt

        const validPassword = hashPassword.decryptPassword(data.password, requiredPassword, requiredSalt)

       // console.log("validPassword", validPassword);

        if (!validPassword) {
            return { isSuccess: false, user: {}, message: "invalid password" };
        }

        if (validPassword) {

            if (student == null) {
                return { isSuccess: false, user: {}, message: "No records Found!" };
            }

            if (student) {
                return { isSuccess: true, message: "tables shows by id", data: student };
            }

            return { isSuccess: false, message: "failure", data: {} };

        }
    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}

//getall
async function getAlll() {
    try {
        const studentDetails = await studentTable.findAll(
            // {order: [['id', 'DESC']]}
            //{ attributes: [sequelize.fn("AVG", sequelize.col("id"))], raw: true}
            // { attributes:['name']}
            //{limit:5,offset:4}
            {
                where:
                    //{id:2},  attributes:['name']}
                    // attributes: { exclude: ['college'] }}
                    // {id: {[Op.eq]: [4,2]}}}
                    // {[Op.and]:[{dept:'mech'},{college:'pec'}]}}
                    //{[Op.or]:[{id:2},{id:31}]}}
                    // {id:{[Op.lte]:6}}}                            //gt,gte,lt
                    // {id:{[Op.notBetween]:[5,13]}}}                //between
                    // {id: {[Op.ne]:[1,2]}}}
                    //{dept:{[Op.is]: null} }}
                    //{college:{[Op.not]: true}}}                    //don't know
                    { dept: { [Op.all]: sequelize.literal('SELECT dept') } }
            }  //throw error
            // {id:{[Op.in]: [1, 2]}}} //notIn
            //{id:{[Op.notIn]: [1, 2]}}}
            // {name:{[Op.like]: '%a%'}}}
            // {name:{[Op.notLike]: '%a%'}}}
            // {name:{[Op.startsWith]: '%a'}}}
            // {name:{[Op.endsWith]: '%a'}}}
            // {name:{[Op.substring]: '%a'}}}
            //{name:{[Op.not]:[ 'hero','ajith']}}}
            // {name:{[Op.regexp]: '^[a|P|h]'}}}
            // {name:{[Op.notRegexp]: '^[a|h]'}}}
            //{name:{[Op.startsWith]: '%a'}}}



            //combinations of operators 'and or not '  

            // {name:{[Op.and]: {[Op.like]:'h%',[Op.notLike]:'%k'}}}}
            //{id:2},  attributes:{[Op.and]:[{dept:'mech'},{college:'pec'}]}}
            //{[Op.not]:[{dept:'mech'},{college:'pec'}]}}
        );
        //console.log("studentdetials",studentDetails);

        if (studentDetails == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        if (studentDetails) {
            return { isSuccess: true, message: "tables shows by id", data: studentDetails };
        }
        return { isSuccess: true, message: "Failure!!", data: studentDetails };

    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}

//find or create
async function getORcreate(data) {
    try {
        const studentDetails = await studentTable.findOrCreate({
            where: { name: data.name }
        });
        if (studentDetails == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        if (studentDetails) {
            return { isSuccess: true, message: "tables shows by id", data: studentDetails };
        }
        return { isSuccess: true, message: "Failure!!", data: studentDetails };

    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}

//find and count all
async function getANDcount(data) {
    try {
        const studentDetails = await studentTable.findAndCountAll({
            where: { dept: data.dept }
        });
        if (studentDetails == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        if (studentDetails) {
            return { isSuccess: true, message: "tables shows by id", data: studentDetails };
        }
        return { isSuccess: true, message: "failure!!", data: studentDetails };


    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}

//getbypkd

async function getByPkd() {
    try {
        const studentDetails = await studentTable.findByPk(2);
        if (studentDetails == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        if (studentDetails) {
            return { isSuccess: true, message: "tables shows by id", data: studentDetails };
        }
        return { isSuccess: true, message: "Failure!!", data: studentDetails };

    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}


//update
async function upDate(dataBody) {
    try {
        const updated = await studentTable.findOne({ where: { id: dataBody.id } });

        if (updated) {
            updated.name = dataBody.name,
                updated.batch = dataBody.batch,
                updated.dept = dataBody.dept,
                updated.college = dataBody.college,
                updated.age = dataBody.age;
            updated.dateofbirth = dataBody.dateofbirth;
            await updated.save();
            return { isSuccess: true, message: "Student details updated Successfully!!", data: updated };
        }
        if (updated == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        return { isSuccess: false, message: "Unable to update Student Details!!" }
    }
    catch (er) {
        return { isSuccess: false, message: "Student details not Found", data: er };
    }

    //     const{ studentDetails,data} =await studentTable.update({//create also same method
    //         name :dataBody.name,
    //         dept :dataBody.dept,
    //         batch :dataBody.batch,
    //         college :dataBody.college
    //  },
    //  {where: {id: dataQuery.id} });

}

//deletebyid
async function deleteOnee(dataQuery) {
    try {
        const studentDetails = await studentTable.destroy({ where: { id: dataQuery.id } });

        if (studentDetails == null) {
            return { isSuccess: false, user: {}, message: "No records Found!" };
        }
        if (studentDetails) {
            return { isSuccess: true, message: "tables shows by id", data: studentDetails };
        }
        return { isSuccess: true, message: "failure!!", data: {} };
    } catch (err) {
        return { isSuccess: false, message: "Failed to access table!!", data: err };
    }
}




console.log("service");
module.exports = {
    create: Create,
    getone: getOnee,
    getall: getAlll,
    getorcreate: getORcreate,
    getandcount: getANDcount,
    getbypkd: getByPkd,
    updatee: upDate,
    deleteone: deleteOnee
}
