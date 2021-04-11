const MongoHelper = require("../../lib/mongoHelper");
const { getSaltRounds } = require("../../config")
const bcrypt = require('bcrypt');
const { ObjectId } = require("mongodb");
const USER_COLLECTION = "users"

module.exports = {
    async getAll() {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(USER_COLLECTION);
        const users = await collection.find({}, {
            projection: {
                password: 0
            }
        }).toArray()
        mongoHelper.disconnect()
        return users
    },
    async get(id) {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(USER_COLLECTION);
        const users = await collection.findOne({ _id: ObjectId(id) })
        mongoHelper.disconnect()
        return users
    },

    async findByEmail(email) {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(USER_COLLECTION);
        const users = await collection.find({ email }).toArray()
        mongoHelper.disconnect()
        return users
    },

    async findOneByEmail(email) {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(USER_COLLECTION);
        const users = await collection.findOne({ email })
        mongoHelper.disconnect()
        return users
    },

    async save(user) {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(USER_COLLECTION);
        user.password = bcrypt.hashSync(user.password, getSaltRounds());
        const result = await collection.insertOne(user)
        mongoHelper.disconnect()
        return result.ops[0]
    }
}