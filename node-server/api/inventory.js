const express = require('express');
let Inventory = require('../models/inventory.model');
const router = express.Router();
router.route('/').get(async (req, res) => {
    try {
        const item = await Inventory.find().populate('group');
        res.json(item);
    } catch(e){
        res.status(400).json("Error: " + e)
    }

  })
router.route('/addItem').post( async (req, res) => {
    try {
        const name = req.body.name;
        const quantity = req.body.quantity;
        const group = req.body.group;

        let new_item
        findItem = await Inventory.find({"name": name})
        if(findItem == null && group == null){
            new_item = new Inventory({name,quantity});
        } else if(group == null){
            if(findItem.group == null){
                findItem.quantity += quantity
            } else {
                new_item = new Inventory({name,quantity});
            }
        } else if(findItem == null) {
            new_item = new Inventory({name,quantity,group});
        } else {
            if(findItem.group == group){
                findItem.quantity += quantity;
            } else {
                new_item = new Inventory({name,quantity,group});
            }
        }
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
        const quantity = req.body.quantity;
        foundItem = await Inventory.findById(req.params.id);
        if(foundItem.quantity > quantity){
            foundItem.quantity -= quantity
            await foundItem.save();
        } else {
            await foundItem.remove()
        }

        res.json(`Inventory with id ${req.params.id} is deleted`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

router.route('/update/:id').post(async (req, res) => {
    try {
        foundItem = await Inventory.findById(req.params.id);
        foundItem.name = req.body.name;
        foundItem.quantity = req.body.quantity;
        foundItem.group = req.body.group;
        foundItem.save();
        res.json(`Inventory with id ${req.params.id} is updated`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

  module.exports = router;
