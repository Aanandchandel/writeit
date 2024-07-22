const express =require('express')
const mongoose = require('mongoose');// Middleware// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

// Define routes (to be added later)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
