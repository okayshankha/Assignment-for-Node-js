var jwt = require('jsonwebtoken');

const verifyJwt = (headers) => {
    try {
        if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
            const token = headers.authorization.split(' ')[1];
            return jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' })
        } else {
            throw Error("authorization token not found")
        }
    } catch (error) {
        throw error
    }
}

// the JWT auth check middleware
function signJwt(payload) {
    const token = jwt.sign(payload, process.env.SECRET, { algorithm: 'HS256' });
    return token;
}

module.exports = {
    signJwt,
    verifyJwt,
}