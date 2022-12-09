const mongoose= require('mongoose');

const dbConnect = async()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
       
    });
console.log(`Mongodb conncected to ${conn.connection.host}`);
}catch(err){
    console.log(err.message);
}
}

module.exports = dbConnect;