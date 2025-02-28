import { ObjectId } from "mongoose";
import { User } from "../../../types";
import crypto from "crypto";
import { createHash } from "../../utils/hash";

class UserDTO {
  userName: string;
  email: string;
  password: string;
  verified?: boolean;
  verifyCode?: string | null;
  recipes?: ObjectId[];
  role: "USER" | "ADMIN";
  registeredWith: "GMAIL" | "GOOGLE" | "FACEBOOK";
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  constructor(data: User) {
    (this.userName = data.userName),
      (this.email = data.email),
      (this.password = createHash(data.password)),
      (this.verified = data.verified || false),
      (this.verifyCode = crypto.randomBytes(6).toString("hex")),
      (this.recipes = []),
      (this.role = data.role || "USER"),
      (this.registeredWith = data.registeredWith),
      (this.resetPasswordToken = null),
      (this.resetPasswordExpires = null);
  }
}

export default UserDTO;
