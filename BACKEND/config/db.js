import mongoose from 'mongoose';

const conDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected');
    }
    catch(err) {
        console.log(err.message);
        process.exit(1);
    }
};

export default conDB;