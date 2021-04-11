const Joi = require('joi');

const UserLoginDTO = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(3).required(),
})

module.exports = {
    validate(payload) {
        const result = UserLoginDTO.validate(payload)
        return result
    }
}