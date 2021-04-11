const { ObjectId } = require("bson");
const createError = require("http-errors")


const UserRepository = require("./user.repository");

module.exports = {
    async getAll(req, res) {
        try {
            const users = await UserRepository.getAll()
            users.map(e => {
                e.image = `http://${req.hostname}:${process.env.PORT}/uploads/${e.image}`
            })

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
            if (!ObjectId.isValid(req.params.id)) {
                const apiError = createError(422, "invalid object id")
                return res.status(apiError.statusCode).send(apiError)
            }

            const user = await UserRepository.get(req.params.id)
            if (!user) {
                const apiResponse = {
                    statusCode: 200,
                    message: "user not found.",
                }
                return res.status(apiResponse.statusCode).send(apiResponse)
            }
            user.image = `http://${req.hostname}:${process.env.PORT}/uploads/${user.image}`
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
            user.image = `http://${req.hostname}:${process.env.PORT}/uploads/${user.image}`

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