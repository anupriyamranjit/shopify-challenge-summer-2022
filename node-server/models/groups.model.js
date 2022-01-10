const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const groupSchema = new Schema ({
	name:{type: String, required: true},
});


const Groups = mongoose.model('Group', groupSchema)

module.exports = Groups;