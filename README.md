# Anupriyam's Shopify-Challenge-Summer-2022
My project for Summer 2022 Backend Developer Role

# Setup without Docker
- git clone this repository
- Download lastest version of node from https://nodejs.org/en/
- cd into node-server run npm start
- cd into frontend run npm start




# Setup Using Docker

- git clone this repository
- Download Docker on https://docs.docker.com/get-docker/
- cd into node-server
- run docker compose build
- run docker compose up
- cd into frontend
- run docker compose build
- run docker compose up



# How to use
To use this app we need localhost:3000 running with the application frontend and node-server running on localhost:8080

## Create Inventory Item 
To create an Inventory Item go to http://localhost:3000/addItem

## Delete Inventory Items
To delete an Inventory Item go to http://localhost:3000/viewItems
then click the x button on top of any item in the list
this will take you to http://localhost:3000/deleteItem/{id}
where you can choose how many of that item you want to delete

If you delete more items then the quantity avaliable it will delete the item as a whole so you cannot see it anymore in http://localhost:3000/viewItems

## Update Inventory Items
To update an Inventory Item go to http://localhost:3000/viewItems
then click the pencil icon beside the x icon on top of any item in the list
this will take you to http://localhost:3000/updateItem/{id}
where you can choose what fields you want to update

Note: If you set the quantity to be 0 this will delete the item



## Get All Inventory Items
To see all current Inventory Items go to http://localhost:3000/viewItems


## Create Groups
To create a group go to http://localhost:3000/addGroups
and fill out all relevant fields

## Delete Groups 
To delete groups go to http://localhost:3000/viewGroups,
click the x icon above any of the groups. This will delete the group

Note: My implementation fo delete group does not delete the items in that group rather it makes the item in to no groups 


## Update Groups
To update groups  go to http://localhost:3000/viewGroups,
click the pencil icon above any of the groups. This will allow you to edit thier name

Note: If you update a groups name all inventory item in the group will also update its group name if you change it to another group that already exist it will merge everything in those 2 groups and merge duplicates items.



## Get All Groups 
To view all groups  go to http://localhost:3000/viewGroups,



# Notes about Implementation

## Testing 
If you want to look at the tests I implemented throughout my building process look at routingTesting.js inside the testing folder 

## Assumption Made about Project


















