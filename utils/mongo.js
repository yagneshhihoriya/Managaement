const mongodb = require('mongodb')
const client = new mongodb.MongoClient(process.env.MONGO_URL)
const db_Name = process.env.DB_NAME || 'DEMO_DB'
const db = client.db(db_Name)

exports.MongoConnect = async () => {
    return {client , db}
}