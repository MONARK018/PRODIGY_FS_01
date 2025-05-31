import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields (username, email, password, role) are required." });
        }

        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        console.log("Existing User Check:", existingUser);

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already exists." });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already registered." });
            }
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashed, role });

        await user.save();
        console.log("User Created Successfully:", user); 
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        if (err.code === 11000) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        res.status(500).json({ message: "Registration Failed" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Login failed" });
    }
};

export const protectedRoute = (req, res) => {
    res.json({ message: "Welcome,  user!" });
};