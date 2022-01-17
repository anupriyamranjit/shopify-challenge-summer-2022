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
then click the x button on top of any items in the list
this will take you to http://localhost:3000/deleteItem/{id}
where you can choose how many of that item you want to delete

If you delete more items then the quantity avaliable it will delete the item as a whole so you cannot see it anymore in http://localhost:3000/viewItems

## Update Inventory Items



## Get All Inventory Items

## Create Groups

## Delete Groups 

## Update Groups

## Get All Groups 


















