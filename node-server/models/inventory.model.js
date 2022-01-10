const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
	name:{type: String, required: true},
	quantity:{type: Number, required: true},
	group:{type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: false}
});


const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory;