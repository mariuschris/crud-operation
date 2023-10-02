const express = require('express');
const router = express.Router();
const ShopItem = require('../schemas/shopItemSchema');
const {authenticateUser, isAdmin} = require("./middlewares");
// Get a list of shop items
router.get('/', authenticateUser, (req, res) => {
    ShopItem.find({}, (err, items) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(items);
    });
  });
  
  // Get a single shop item by ID
  router.get('/:id', authenticateUser, (req, res) => {
    const itemId = req.params.id;
    ShopItem.findById(itemId, (err, item) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.send(item);
    });
  });
  
  // Add a new shop item (only for admins)
  router.post('/', authenticateUser, isAdmin, (req, res) => {
    const newItem = new ShopItem(req.body);
    newItem.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Item added successfully');
    });
  });
  
  // Edit a shop item (only for admins)
  router.put('/:id', authenticateUser, isAdmin, (req, res) => {
    const itemId = req.params.id;
    ShopItem.findByIdAndUpdate(itemId, req.body, (err, item) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.send('Item updated successfully');
    });
  });
  
  // Delete a shop item (only for admins)
  router.delete('/:id', authenticateUser, isAdmin, (req, res) => {
    const itemId = req.params.id;
    ShopItem.findByIdAndDelete(itemId, (err, item) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!item) {
        return res.status(404).send('Item not found');
      }
      res.send('Item deleted successfully');
    });
  });
  
module.exports = router;