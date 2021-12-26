const mongoose=require("mongoose");


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/realTimeChatAppDB').then(()=>{
    console.log("DB Connection Successful");
}).catch((e)=>{
    console.log("DB Connection error!!");
})