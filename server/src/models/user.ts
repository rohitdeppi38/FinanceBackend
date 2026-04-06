import {Schema,model} from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['viewer','analyst','admin'],
        default:'viewer'
    },
    isActive:{
        type:Boolean,
        default:true
    }
})

export default model("user",userSchema);