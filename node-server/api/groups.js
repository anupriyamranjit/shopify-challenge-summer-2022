const express = require('express');
let Groups = require('../models/groups.model');
const Inventory = require('../models/inventory.model');
const router = express.Router();

// GET Route: All Groups
router.route('/').get(async (req, res) => {
    try {
        const groups = await Groups.find();
        res.json(groups);
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })

  // GET Individual group
  router.route('/:id').get(async (req, res) => {
    try {
        const groups = await Groups.findById(req.params.id);
        res.json(groups);
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })
// POST route add new group
  router.route('/addGroup').post(async (req, res) => {
    try {
      // Constants
        const name = req.body.name;
        // Find all groups with same name
        const checkForExisitingGroup = await Groups.find({"name": name})
        // If group exist then return group already exists 
        if(checkForExisitingGroup.length > 0){
          res.json(`Group ${name} Already Exists`);
        } else {
          // Else make a new group
          const new_group = new Groups({name});
          await new_group.save();
          res.json(`Group ${name} Added`);
        }
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })
// DELETE route: Delete group 
  router.route('/:id').delete(async (req, res) => {
    try {
      const id = req.params.id
      let valuesNeedUpdated = await Inventory.find({"group": id})

      for(let i = 0; i < valuesNeedUpdated.length; i++){
          // Find inventory items we can merge with when we change group
          let mergeableObject = await Inventory.find({"name" : valuesNeedUpdated[i].name, "group": undefined});

          if(mergeableObject.length === 0){
              // If no similar inventory item exist within the other group  then change groups
              valuesNeedUpdated[i].group = undefined;
              await valuesNeedUpdated[i].save();
          } else {
              // If similar object does exist then merge quantity into that object and remove our existing object
              mergeableObject[0].quantity += valuesNeedUpdated[i].quantity;
              await valuesNeedUpdated[i].remove();
              await mergeableObject[0].save();
          }
      }
      await Groups.findByIdAndDelete(req.params.id);

        res.json("Group Deleted");
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })
// PATCH route: update group
  router.route('/update/:id').patch(async (req, res) => {
    try {
        //Constants`
        const name = req.body.groupname
        const id = req.params.id

        // Variable
        let foundGroup = await Groups.findById(id);
        let foundGroupExist = await Groups.find({ "name": name, _id: { $ne: id } });

        if(foundGroupExist.length === 0){
            // If no group with same name change name
            foundGroup.name = name;
            await foundGroup.save();
        } else {
            let valuesNeedUpdated = await Inventory.find({"group": id})

            for(let i = 0; i < valuesNeedUpdated.length; i++){
                // Find inventory items we can merge with when we change names
                let mergeableObject = await Inventory.find({"name" : valuesNeedUpdated[i].name, "group": foundGroupExist[0]._id});

                if(mergeableObject.length === 0){
                    // If no similar inventory item exist within the other group  then change groups
                    valuesNeedUpdated[i].group = foundGroupExist[0]._id;
                    await valuesNeedUpdated[i].save();
                } else {
                    // If similar object does exist then merge quantity into that object and remove our existing object
                    mergeableObject[0].quantity += valuesNeedUpdated[i].quantity;
                    await valuesNeedUpdated[i].remove();
                    await mergeableObject[0].save();
                }
            }
            await foundGroup.remove()
          }


        res.json("Group Change Saved");
    } catch(e){
        res.status(400).json("Error: " + e);
    }
  })


  module.exports = router;
