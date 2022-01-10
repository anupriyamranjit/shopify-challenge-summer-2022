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
    try {
        const name = req.body.name;
        const quantity = req.body.quantity;
        const new_item = new Inventory({name,quantity});
        await new_item.save();
        res.json(`Inventory item: ${name} added`);
    } catch (e) {
        res.status(400).json('Error: ' + e);
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

router.route('/update/:id').post(async (req, res) => {
    try {
        foundItem = await Inventory.findById(req.params.id);
        foundItem.name = req.body.name;
        foundItem.save();
        res.json(`Inventory with id ${req.params.id} is updated`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

  module.exports = router;
