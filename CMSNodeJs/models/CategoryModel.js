const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const categorySchema= new Schema({
   title:{
       type:String,
       requierd:true
   }

})
module.exports=mongoose.model("category",categorySchema)
;