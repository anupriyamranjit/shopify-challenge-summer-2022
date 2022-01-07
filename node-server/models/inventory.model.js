const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
	name:{type:String, required: true},
	what:{type:String, required: true},
	year:{type:Number, required: true},
});


const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory;