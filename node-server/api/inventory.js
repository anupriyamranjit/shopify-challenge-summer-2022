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

        let findItem;
        let new_item;
        if(group === undefined){
            findItem = await Inventory.find({"name": name, "group": undefined})
        } else {
            findItem = await Inventory.find({"name": name , "group": group})
        }
        
        if(findItem.length === 0 && group === undefined){
            new_item = new Inventory({name,quantity});
            await new_item.save();
        } else if(group === undefined){
            if(findItem[0].group === undefined){
                findItem[0].quantity += quantity
                await findItem[0].save()
            } else {
                new_item = new Inventory({name,quantity});
                await new_item.save();
            }
        } else if(findItem.length === 0) {
            new_item = new Inventory({name,quantity,group});
            await new_item.save();
        } else {
            if(findItem[0].group.toString() === group){
                findItem[0].quantity += quantity;
                await findItem[0].save()
            } else {
                new_item = new Inventory({name,quantity,group});
                await new_item.save();
            }
        }
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
        let findItems;
        foundItem = await Inventory.findById(req.params.id);
        if(req.body.quantity <= 0){
            foundItem.remove()
        }
        else if(req.body.group === undefined){
            findItems = await Inventory.find({"name": req.body.name, "group": undefined});
            if(findItems.length === 0){
                foundItem.name = req.body.name;
                foundItem.quantity = req.body.quantity;
                foundItem.group = req.body.group;
                await foundItem.save()
            } else {
                findItems[0].quantity += req.body.quantity;
                await findItems[0].save()
                await foundItem.remove()
            }
        }  else {
            findItems = await Inventory.find({"name": req.body.name, "group": req.body.group});
            if(findItems.length === 0){
                foundItem.name = req.body.name;
                foundItem.quantity = req.body.quantity;
                foundItem.group = req.body.group;
                await foundItem.save()
            } else {
                findItems[0].quantity += req.body.quantity;
                await findItems[0].save()
                await foundItem.remove()
            }
        }
        res.json(`Inventory with id ${req.params.id} is updated`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

  module.exports = router;
