let mongoose = require('mongoose');
require ('dotenv').config();
// Create Database class
class Database {
    constructor() {
        // Connect to database when initalized
        this._connect()
    }
    // Connection method
    _connect() {
        // If in testing connect to testing database
        if(process.env.NODE_ENV === "test"){
            mongoose.connect(process.env.MONGO_TEST)
            .catch(err => { console.log(err) })
        } else {
            // Else connect to actual database
            mongoose.connect(process.env.MONGO_URI)
            .catch(err => { console.log(err) })
        }
        
    }
}

module.exports = new Database()
