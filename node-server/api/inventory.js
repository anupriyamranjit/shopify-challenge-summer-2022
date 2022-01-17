const express = require('express');
let Inventory = require('../models/inventory.model');
const router = express.Router();

// GET Route: Gets all inventory items
router.route('/').get(async (req, res) => {
    try {
        // .populate: Need to replace all Group Object IDs with group object
        const item = await Inventory.find().populate('group');
        res.json(item);
    } catch(e){
        // Send Error if anything goes wrong
        res.status(400).json("Error: " + e)
    }

  })

// POST Route: Adds Inventory Item
router.route('/addItem').post( async (req, res) => {
    try {
        // Constants 
        const name = req.body.name;
        const quantity = req.body.quantity;
        // group can be undefined
        const group = req.body.group;

        // Variable Declaration
        let findItem;
        let new_item;

        // Mongoose find if it exists
        findItem = await Inventory.find({"name": name, "group": group})
        if(findItem.length === 0) {
            // If it does not exist add new inventory
            new_item = new Inventory({name,quantity,group});
            await new_item.save();
        } else {
            // If it does exist add to its quantity
            findItem[0].quantity += quantity
            await findItem[0].save()
        }
        
        res.json(`Inventory item: ${name} added`);
    } catch (e) {
        res.status(400).json('Error: ' + e);
    }
})
// GET Route: Get Individual Inventory Item
router.route('/:id').get(async (req, res) => {
    try {
        foundItem = await Inventory.findById(req.params.id);
        res.json(foundItem);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

// DELETE Route: Delete Items
router.route('/:id/:quantity').delete(async (req, res) => {
    try {
        //Constants
        const quantity = req.params.quantity;
        const id = req.params.id

        //Mongoose find by ID
        foundItem = await Inventory.findById(id);

        // Logic for Deletion
        if(foundItem.quantity > quantity){
            // If removing less then avaliable simply reduce quantity
            foundItem.quantity -= quantity
            await foundItem.save();
        } else {
            // If removing more than or equal to delete item
            await foundItem.remove()
        }
        res.json(`Inventory with id ${id} is deleted`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

// PATCH Route: Update Item
router.route('/update/:id').patch(async (req, res) => {
    try {
        // Constants 
        const name = req.body.name;
        const quantity = req.body.quantity;
        const group = req.body.group;
        const id = req.params.id;

        // Variable
        let findItems;
        let foundItem = await Inventory.findById(id);

        // If the update reduces the quantity to 0 or less delete the item
        if(quantity <= 0){
            foundItem.remove()
        }
        else {
            // Find if simliar items exist 
            findItems = await Inventory.find({"name": name, "group": group});
            if(findItems.length === 0){
                // If it does not then change current item with new details
                foundItem.name = name;
                foundItem.quantity = quantity;
                foundItem.group = group;
                await foundItem.save()
            } else {
                // If a similar item already exist then the update will merge them
                if(findItems[0]._id.toString() !== id){
                    console.log("Here")
                    console.log(findItems[0]._id)
                    console.log(id)
                    findItems[0].quantity += quantity;
                    await findItems[0].save()
                    await foundItem.remove()
                } else {
                    foundItem.name = name;
                    foundItem.quantity = quantity;
                    foundItem.group = group;
                    await foundItem.save()
                }
                
            }
        }
        res.json(`Inventory with id ${id} is updated`);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }
})

  module.exports = router;
