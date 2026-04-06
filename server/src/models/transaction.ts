import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    amount:Number,
    type:{
        type:String,
        enum:["income","expense"]
    },
    category:String,
    date:{
        type:Date,
        default:Date.now(),
    },
    note:String
})

export default mongoose.model("Transaction",transactionSchema);