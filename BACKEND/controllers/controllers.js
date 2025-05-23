const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>
{
    try{
        const {username,password,role} = req.body;

        const existing = await User.findOne({username});
        if(existing) return res.status(400).json({message: 'User Already Exists.'});

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashed,role});

        await user.save();
        res.status(201).json({message: 'User Registered'});
    }
    catch(err)
    {
         console.error("Registration Error:", err);
        res.status(500).json({message: 'Registration Failed'});
    }
};

exports.login = async (req,res)=>
{
     const {username,password,role} = req.body;

     try{
        const user = await User.findOne({username});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({ id: user._id, role}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({token});
    }
    catch(err)
    {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.protected = (req, res) => {
  res.json({ message: `Welcome, ${req.user.role} user!` });
};