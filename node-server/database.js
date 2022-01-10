let mongoose = require('mongoose');
require ('dotenv').config();

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(process.env.MONGO_URI)
        .catch(err => { console.log(err) })
        const connection = mongoose.connection;
        connection.once('open',() =>{
            console.log("MongoDB database connection established")
        })
    }
}

module.exports = new Database()
