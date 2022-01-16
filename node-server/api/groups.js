const express = require('express');
let Groups = require('../models/groups.model');
const Inventory = require('../models/inventory.model');
const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const groups = await Groups.find();
        res.json(groups);
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })

  router.route('/addGroup').post(async (req, res) => {
    try {
        const name = req.body.name;
        const new_group = new Groups({name});
        await new_group.save();
        res.json(`New Group ${name} Added`);
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })

  router.route('/:id').delete(async (req, res) => {
    try {
        foundGroup = await Groups.findByIdAndDelete(req.params.id);
        res.json("Group Deleted");
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })

  router.route('/update/:id').post(async (req, res) => {
    try {
        foundGroup = await Groups.findById(req.params.id);
        foundGroupExist = await Groups.find({"name": req.body.groupname});

        if(foundGroupExist.length === 0){
            foundGroup.name = req.body.groupname;
            await foundGroup.save();
        } else {
            await Inventory.updateMany({"group": req.params.id}, {"$set":{"group": foundGroupExist[0]._id}});
            await foundGroup.remove()
        }

        res.json("Group Change Saved");
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })


  module.exports = router;
