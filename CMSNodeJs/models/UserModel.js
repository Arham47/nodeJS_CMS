mongoose=require("mongoose");
Schema=mongoose.Schema;

UserModel= new Schema({
firstName:{
    type: String,
    required:true 
},
lastName:{
    type: String,
    required:true 
},
email:{
    type:String,
    required:true
}
,
password:{
    type:String,
    required:true
}
})
module.exports={user:mongoose.model('user',UserModel)}