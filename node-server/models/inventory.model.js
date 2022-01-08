const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
	name:{type: String, required: true},
	weight:{type: Number, required: true},
	price:{type: Number, required: true},
	quantity:{type: Number, required: true},
	unique:{type: Boolean, required: true}
});


const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory;