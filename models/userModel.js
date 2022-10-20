import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hashing password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Genrate token
userSchema.methods.generateToken = async function () {
  return Jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

export default model("User", userSchema);
