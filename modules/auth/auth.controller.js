const UserRegistrationDTO = require("./dtos/user-register-dto")
const UserLoginDTO = require("./dtos/user-login-dto")
const createError = require("http-errors")
const del = require('del');
const bcrypt = require('bcrypt');


const UserRepository = require("../user/user.repository");
const { signJwt } = require("../../lib/jwtHelper");

module.exports = {
    async login(req, res) {
        try {
            const { body } = req
            const validationResult = UserLoginDTO.validate(body)

            if (validationResult.error) {
                const { error } = validationResult
                const apiError = createError(422, { error })
                return res.status(apiError.statusCode).send(apiError)
            }

            const user = await UserRepository.findOneByEmail(body.email)
            if (!user && bcrypt.compareSync(body.password, user.password)) {
                const apiError = createError(401, "Invalid credentials.")
                return res.status(apiError.statusCode).send(apiError)
            }

            delete user.password
            const token = signJwt(user)

            const apiResponse = {
                statusCode: 200,
                message: "login successful",
                token
            }
            return res.status(apiResponse.statusCode).send(apiResponse)

        } catch (error) {
            console.log(error);
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    },

    async register(req, res) {
        try {
            const { body } = req
            const validationResult = UserRegistrationDTO.validate(body)

            if (validationResult.error) {
                if (req.file) await del(req.file.path)
                const { error } = validationResult
                const apiError = createError(422, { error })
                return res.status(apiError.statusCode).send(apiError)
            }

            const users = await UserRepository.findByEmail(body.email)
            if (users.length) {
                if (req.file) await del(req.file.path)
                const apiError = createError(409, "email is taken")
                return res.status(apiError.statusCode).send(apiError)
            }

            const userDataToSave = {
                ...body,
                image: req.file.filename
            }
            const user = await UserRepository.save(userDataToSave)
            user.image = `http://${req.hostname}:${process.env.PORT}/uploads/${user.image}`

            const apiResponse = {
                statusCode: 200,
                message: "user registration successful",
                user
            }
            return res.status(apiResponse.statusCode).send(apiResponse)
        } catch (error) {
            console.log(error);
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    }
}