mongoose = require("mongoose");
Schema = mongoose.Schema;

CommentModel = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: date,
        default: Date.now()
    },
    commentIsApproved:{
        type:Boolean,
        default:false
    }

})