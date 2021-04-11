const createError = require("http-errors")


const UserRepository = require("./user.repository");

module.exports = {
    async getAll(req, res) {
        try {
            const users = await UserRepository.getAll()
            const apiResponse = {
                statusCode: 200,
                message: "all user data fetched.",
                users
            }
            return res.status(apiResponse.statusCode).send(apiResponse)
        } catch (error) {
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    },

    async get(req, res) {
        try {
            const user = await UserRepository.get(req.params.id)
            const apiResponse = {
                statusCode: 200,
                message: "all user data fetched.",
                user
            }
            return res.status(apiResponse.statusCode).send(apiResponse)
        } catch (error) {
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    },

    async me(req, res) {
        try {
            if (!req.user) throw Error("User not found")

            const user = await UserRepository.findOneByEmail(req.user.email)
            if (!user) {
                const apiError = createError(500)
                return res.status(apiError.statusCode).send(apiError)
            }

            delete user.password

            const apiResponse = {
                statusCode: 200,
                message: "user data fetched.",
                user
            }
            return res.status(apiResponse.statusCode).send(apiResponse)

        } catch (error) {
            const apiError = createError(500, error)
            return res.status(apiError.statusCode).send(apiError)
        }
    }
}