module.exports = {
    getDBUrl: () => {
        return process.env.MONGODB_CONNECTION_STRING
    },

    getDB: () => {
        return process.env.DATABASE_NAME
    },
    getSaltRounds: () => {
        return parseInt(process.env.SALT_ROUNDS)
    }
}