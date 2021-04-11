const createError = require("http-errors")
const { verifyJwt } = require("../lib/jwtHelper")


module.exports = {
    async authenticate(req, res, next) {
        try {
            const tokenUser = await verifyJwt(req.headers)
            if (tokenUser) {
                req.user = tokenUser
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