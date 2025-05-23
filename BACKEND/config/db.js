const mongoose = require('mongoose')

const conDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB connected');
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = conDB;