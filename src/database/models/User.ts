import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verifyCode: { type: String, default: null }, 
    recipes: [{ type: Schema.Types.ObjectId, ref: "recipe" }], 
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }, 
    registeredWith: {type: String, enum: ["FACEBOOK","GOOGLE","EMAIL"]}, default: "EMAIL",
    resetPasswordToken: { type: String, default: null }, 
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true } 
);

const UserModel = model("user", UserSchema);

export default UserModel;
