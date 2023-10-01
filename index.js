const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const shopItemRoute = require('./routes/shopItems')
const userRoute = require('./routes/users')

// Load environment variables from .env
require('dotenv').config();

// Connect to MongoDB
const connect = mongoose.connect(process.env.mongoDBURL);
connect.then(() => {
  console.log("Connected sucessfully to my database");
}).catch((error) => {
  console.log("Could not connect to the database, reason =", error);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/shopitems', shopItemRoute);
app.use('/api/users', userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
