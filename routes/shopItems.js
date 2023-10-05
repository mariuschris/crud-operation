const express = require('express');
const router = express.Router();
const shopItem = require('../schemas/shopItemSchema');
const {authenticateUser, isAdmin} = require("./middlewares");

// Get list of all shop items
router.get('/', authenticateUser, async (req, res) => {
    try {
      const items = await shopItem.find();
      res.send(items);
    } catch (error) 
      {res.status(500).send(error.message)}    
    });
    
// Get a single shop item by ID
  router.get('/:id', authenticateUser, async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await shopItem.findById(itemId)
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.send(item);
    } catch (error) {res.status(500).send(error.message)}   
    });
  
  // Add a new shop item (only for admins)
  router.post('/', authenticateUser, isAdmin, async (req, res) => {
    try {
      const {name, description, price, isInStock} = req.body
      const {userId} = req.user
      const newItem = new shopItem({name, description, price, isInStock, user:userId});
      const data = await newItem.save()

      res.status(201).json({
        'message': 'Item added successfully',
        newItem
      });
    } catch (error) {res.status(500).send(error.message)}
  });

  
  // Edit a shop item (only for admins)
  router.put('/:id', authenticateUser, isAdmin, async (req, res) => {
   try {
     const itemId = req.params.id;   
     const item = await shopItem.findByIdAndUpdate(itemId, req.body, {new: true})
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.json({
        message: "Item updated sucessfully",
        item
      });
   } catch (error) {res.status(500).send(error.message)}
  });
  
  // Delete a shop item (only for admins)
  router.delete('/:id', authenticateUser, isAdmin, async (req, res) => {
    try {
      const itemId = req.params.id;   
      const item = await shopItem.findByIdAndDelete(itemId)
       if (!item) {
         return res.status(404).send('Item not found');
       }
       res.send("Item deleted sucessfully");
    } catch (error) {res.status(500).send(error.message)}
   });
  
module.exports = router;