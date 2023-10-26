const Joi = require('joi')

const JoiSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),//.unique((a, b) => a.split('-')[0] === b.split('-')[0]),
    college: Joi.string().min(3).max(50).optional(),
    dateofbirth: Joi.date().optional(),
    dept: Joi.string().min(2).max(10).optional(),
    age: Joi.string().min(1).max(5).optional(),
    batch: Joi.string().min(2).max(5).optional(),
    password:Joi.string().required()
});//.unique((a, b) => a.name === b.id);

module.exports = JoiSchema;