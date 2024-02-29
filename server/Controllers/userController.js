const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const createToken = (id) => {
   const jwtkey = process.env.JWT_SECRET_KEY;
   return jwt.sign({ id }, jwtkey, {
       expiresIn: "3d"
   });
}


const registerUser = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

    let user =  await userModel.findOne({ phone });
    if(user) return res.status(400).json({ error: 'User already exists' });
    if(!name || !phone || !password) return res.status(400).json({ error: 'All fields are required' });
    if(!validator.isMobilePhone(phone,)) return res.status(400).json({ error: 'Invalid phone number' });

    if(!validator.isStrongPassword(password)) return res.status(400).json({ error: 'Password is not strong enough' });

    user = new userModel({ name, phone, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = createToken(user._id);
    res.status(201).json({_id: user._id, name, phone, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        let user = await userModel.findOne({
            phone
        });
        if (!user) return res.status(400).json({ error: 'Invalid phone or password' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid phone or password' });
        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, name: user.name, phone: user.phone, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const finUser = async (req, res) => {
   const userId = req.params.userId;
    try {
         const user = await userModel.findById(userId);
         if(!user) return res.status(404).json({ error: 'User not found' });
         res.status(200).json(user);
    } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'Internal server error' });
    }
}

const getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    registerUser, loginUser, finUser, getUser
}   