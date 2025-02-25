import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verifyCode: { type: String, default: null }, 
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }], 
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }, 
    resetPasswordToken: { type: String, default: null }, 
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true } 
);

const UserModel = model("User", UserSchema);

export default UserModel;
