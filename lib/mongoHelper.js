const { MongoClient } = require("mongodb")
const { getDBUrl, getDB } = require("../config")

class MongoHelper {
    client = null
    uri = null
    db = null

    async connect(uri, db) {
        this.uri = uri ?? getDBUrl()
        this.db = db ?? getDB()
        try {
            this.client = await MongoClient.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authSource: 'admin',
            })
        } catch (error) {
            console.log('Mongo default connection error: ' + error)
            throw error
        }
    }

    async disconnect() {
        await this.client.close()
        this.client = null
    }

    async getCollection(name) {
        if (!this.uri) {
            this.uri = getDBUrl()
        }
        if (!this.client?.isConnected()) {
            await this.connect(this.uri)
        }
        return this.client.db(this.db).collection(name)
    }

}

module.exports = MongoHelper
