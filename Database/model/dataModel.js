const mongoose=require("mongoose");

const userInfoSchema=new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    roomID: {
        type: String,
        required: true
    },
    meetingTitle:{
        type: String
    },
    creator: {
        type: Boolean
    }
})


const userInfo=new mongoose.model("userInfo", userInfoSchema);

module.exports=userInfo;