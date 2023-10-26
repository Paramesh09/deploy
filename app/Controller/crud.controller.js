const express = require('express');
const JoiSchema = require('../validator/joi.validation')
//const { check, validationResult } = require('express-validator');

const responsHelper = require('../Lib/sendResponse');
const accessTable = require('../Services/first service');
//const db=require('../Model/index.model');

const router = express.Router();
console.log("controller");
const parser = require('body-parser');
//const studentTable = require('../Model/studentTable');
router.use(parser.urlencoded({ extended: true }))


//create
router.post('/create', async (req, res) => {


    //ERROR VALIDATION
    const {error, value} = JoiSchema.validate(req.body,{abortEarly:false});


    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details
        });
    }
    if (value) {
        try {
            //console.log('values on controller',errors.value);
            var data = req.body;

            var result = await accessTable.create(data);
            // console.log("result", result);
            return responsHelper.SendResponse(res, result);
        }
        catch (err) {
            return responsHelper.SendErrorResponse(err, res);
        }
    }
})


//getbyid
router.get('/get', async (req, res) => {
    try {

        var data = req.query;
        var result = await accessTable.getone(data)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        console.log("err",err);
        return responsHelper.SendErrorResponse(err, res);
    }
})

//getall
router.get('/getall', async (req, res) => {
    try {

        var result = await accessTable.getall()
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

//get or create
router.get('/findorcreate', async (req, res) => {
    try {
        const data = req.query;
        var result = await accessTable.getorcreate(data)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

//get and count
router.get('/findandcount', async (req, res) => {
    try {
        const data = req.query;
        var result = await accessTable.getandcount(data)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

//findbyid
router.get('/findbypkd', async (req, res) => {
    try {
        var result = await accessTable.getbypkd()
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})



//update
router.put('/update', async (req, res) => {

    const {error, value} = JoiSchema.validate(req.body,{abortEarly:false});

    if (error) {
        return res.status(400).json({
            success: false,
            errors: error
        });
    }
    if(value){
    try {
        var dataQ = req.query;
        //var dataB = req.body;
        var result = await accessTable.updatee(dataQ)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
}})

router.delete('/delete', async (req, res) => {
    try {
        var dataQ = req.query;
        // var dataB = req.body;

        var result = await accessTable.deleteone(dataQ)
        return responsHelper.SendResponse(res, result);
    }
    catch (err) {
        return responsHelper.SendErrorResponse(err, res);
    }
})

module.exports = router;