const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/realTimeChatAppDB').then(()=>{
    console.log("DB Connection Successful");
}).catch((e)=>{
    console.log("DB Connection error!!");
})