const MongoHelper = require("../../lib/mongoHelper");
const POST_COLLECTION = "posts"
const USER_COLLECTION = "users"

module.exports = {
    async findAllGroupedByUser(email) {
        const mongoHelper = new MongoHelper()
        const userCollection = await mongoHelper.getCollection(USER_COLLECTION);

        const postDataGroupedByUser = await userCollection.aggregate([
            {
                $lookup: {
                    from: POST_COLLECTION,
                    localField: "_id",
                    foreignField: "_user",
                    as: "posts"
                }
            },
            {
                $addFields: {
                    postCount: { $size: "$posts" }
                }
            },
            {
                $match: {
                    postCount: {
                        $gt: 0
                    }
                }
            },
            {
                $project: {
                    password: 0,
                    postCount: 0
                }
            }
        ]).toArray()
        mongoHelper.disconnect()
        return postDataGroupedByUser
    },

    async save(post) {
        const mongoHelper = new MongoHelper()
        const collection = await mongoHelper.getCollection(POST_COLLECTION);
        const result = await collection.insertOne(post)
        delete result.password
        mongoHelper.disconnect()
        return result.ops[0]
    }
}