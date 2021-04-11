const createError = require("http-errors")
const { verifyJwt } = require("../lib/jwtHelper")
const UserRepository = require("../modules/user/user.repository");

module.exports = {
    async authenticate(req, res, next) {
        try {
            const tokenUser = await verifyJwt(req.headers)
            if (tokenUser) {
                const user = await UserRepository.get(tokenUser._id)
                if (!user) throw Error()

                req.user = user
                return next()
            } else {
                throw Error()
            }
        } catch (error) {
            const apiError = createError(401)
            return res.status(apiError.statusCode).send(apiError)
        }
    }
}