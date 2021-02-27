const Joi = require('@hapi/joi');

function ValidateUser(body){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6),
  });
  return schema.validate(body);
}
  
module.exports.ValidateUser = ValidateUser;