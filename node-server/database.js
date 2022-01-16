let mongoose = require('mongoose');
require ('dotenv').config();

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        if(process.env.NODE_ENV === "test"){
            console.log("Now in Testing")
            mongoose.connect(process.env.MONGO_TEST)
            .catch(err => { console.log(err) })
        } else {
            mongoose.connect(process.env.MONGO_URI)
            .catch(err => { console.log(err) })
        }
        
    }
}

module.exports = new Database()
