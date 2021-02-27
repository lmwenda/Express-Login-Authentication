const router = require('express').Router();
const jwt = require("json-web-token");
const bcrypt = require('bcryptjs');

// Exported Components
const User = require('../Models/User');
const { ValidateUser }  = require('../Auth/UserAuth');

// REGISTER ROUTE
router.post('/register', async (req, res) => {

    // VALIDATING OUR USER
    const { error } = ValidateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECKING IF OUR USER EXISTS
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email Already Exists.');

    // HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATING OUR NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // SAVING OUR USER AND SENDING IT
    try{
        const savedUser = await user.save();
        res.send(JSON.stringify(savedUser));
    } catch(err){
        res.status(400).send(err);
    }

});

// LOGIN ROUTE
router.post('/login', async(req, res) => {

    // CHECKING IF OUR USER'S EMAIL IS VALID
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password.');

    // CHECKING IF OUR PASSWORD IS VALID
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid Email or Password.");

    // CREATING AND ASSIGNING A JWT TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token);

    res.send("Welcome back " + user.name + " to our Services!")
});

// GETTING A SPECIFIC USER
router.get('/user/:userID', async(req, res) => { 
    try{ 
        const user = await User.findById(req.params._id);
        res.json(user);
    }
    catch(err){
        res.json({ message: "Page not Found. Error 404.", error: err });
    }
})

// Deleting a User
router.delete('/user/:userID', (req, res) => {
    try{ 
        const user = User.findByIdAndDelete(req.params._id);
        res.send("Deleted User: " + user.name);
        console.log("Deleted User: " + user.name);
    }
    catch(err){
        res.json({ message: err })
    }
})

module.exports = router;