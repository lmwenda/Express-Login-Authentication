const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Initializations
const app = express();
const PORT = 5000;

dotenv.config();

// Database Setup
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true },  () => { 
    console.log("Connected to DB: ProShop_Database");
});

// Basic Routes
app.get('/' , (req, res) => {
    res.send("<h1> Welcome to our API Dashboard! View http://localhost:5000/api/products to see all of our Products API! View our Github",
    "for more information!",
    "</h1>");
})

// Components
const ProductRoutes = require('./Routes/ProductRoutes');
const UserRoutes = require('./Routes/UserRoutes');

// Middlewares 
app.use(cors());
app.use(express.json());

// Route Middlewares
app.use('/api', ProductRoutes);
app.use('/user', UserRoutes);

// Listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
})