const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var userSchema =new Schema({
    userId:String,
    firstName:String,
    email:String,
    password:String,
    age:Number
});

var userModel=mongoose.model('user',userSchema);
module.exports ={userModel};