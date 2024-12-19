import { Schema,model } from "mongoose";

//userSchema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default:"user"
    }
})

//model
const User=model("user",userSchema)

export {User}