import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password:
    {
        type: String,
        required: true,
    },
    role:
    {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' 
    }
});

export default mongoose.model('User', userschema);