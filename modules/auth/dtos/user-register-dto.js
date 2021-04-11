const Joi = require('joi');

const UserRegistrationDTO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(3).required(),
    phone: Joi.number().required(),
})

module.exports = {
    validate(payload) {
        const result = UserRegistrationDTO.validate(payload)
        return result
    }
}