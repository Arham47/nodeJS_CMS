const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PostSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"public"
    },
    description:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'category'
    },
    comment:[
{        type:Schema.Types.ObjectId,
    ref:'comment'
}        
    ],
    allowComment:{
        type: Boolean,
        default:false

        
    },
    file:{
        type:String,
        default:" "
    }

})
module.exports= mongoose.model("post",PostSchema)
;