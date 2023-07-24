import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please,provide your username!"],
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: [true, "Please,provide your password!"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
