const Joi = require('joi');

const PostCreateDTO = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = {
    validate(payload) {
        const result = PostCreateDTO.validate(payload)
        return result
    }
}