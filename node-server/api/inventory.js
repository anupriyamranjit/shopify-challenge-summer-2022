const express = require('express');
let Inventory = require('../models/inventory.model');
const router = express.Router();
router.route('/').get(async (req, res) => {
    try {
        const item = await Inventory.find();
        res.json(item);
    } catch(e){
        res.status(400).json("Error: " + e)
    }

  })
router.route('/addItem').post( async (req, res) => {
    const name = req.body.name;
    const weight = req.body.weight;
    const price = req.body.price;
    const quantity = 1;
    const unique = req.body.unique;
    let findItem = await Inventory.findOne({ name : req.body.name, unique : false }).exec()
                 .catch(error => res.status(400).json('Error: ' + error))
    console.log(findItem);
    if(findItem != null){
        findItem.quantity = findItem.quantity + 1;
        await findItem.save().catch(error => res.status(400).json('Error: ' + error));
    } else {
    const new_item = new Inventory({name,weight,price,quantity,unique});
    new_item.save()
    .then(() => res.json(`Inventory item: ${name} added`))
    .catch(err => res.status(400).json('Error: ' + err))
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        foundItem = await Inventory.findById(req.params.id);
        res.json(foundItem);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

router.route('/:id').delete(async (req, res) => {
    try {
        foundItem = await Inventory.findByIdAndDelete(req.params.id);
        res.json(`Inventory with id ${req.params.id} is deleted`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

  module.exports = router;
