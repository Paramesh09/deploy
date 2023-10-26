const express = require('express');
const router = express.Router();

const createController = require('../Controller/crud.controller');

router.use('/studentTable',createController)
 

module.exports = router;
