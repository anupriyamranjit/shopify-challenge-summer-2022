let mongoose = require('mongoose');
let config = require('./config');

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.Promise = global.Promise
        const url = config.url;
        const connectionParams = {
            useNewUrlParser: true,
            user: config.user,
            pass: config.pwd,
            useUnifiedTopology: true
        };
        mongoose.connect(url, connectionParams)
        .then(() => console.log("Connection Successful"))
        .catch(err => console.error(err));
    }
}

module.exports = new Database()
